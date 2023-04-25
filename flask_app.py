import os
import openai
from flask import Flask, render_template, url_for, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import langchain
from langchain.text_splitter import RecursiveCharacterTextSplitter
import textract
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import ElasticVectorSearch, Pinecone, Weaviate, FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import random
from flask_session import Session


app = Flask(__name__)

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)





@app.route("/", methods=["POST", "GET"])
def learn():
    if request.method == "POST":
        global index
        global res
        open_ai_api = request.form.get("openai-key")
        openai.api_key = open_ai_api
        document = request.files.get("file_input")
        path = f"./files/{random.randint(436785647637, 345867456783837465453876)}{document.filename}"
        document.save(path)


        # Open the PDF file in read binary mode
        # Open the PDF file in read binary mode
        # Extract the text using the textract library
        text = textract.process(path)

        # Convert the byte string to a regular string
        text = text.decode('utf-8')
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

        texts = text_splitter.split_text(text)
        session["openai_key"] = open_ai_api

        os.environ["OPENAI_API_KEY"] = session.get("openai_key")
        embeddings = OpenAIEmbeddings()
        session['texts'] = texts
        # Send the message to OpenAI API
        docsearch = FAISS.from_texts(texts, embeddings)
        session["docsearch"] = docsearch
        os.remove(path)

        return render_template("index.html")
    return render_template("index.html")


@app.route('/process_message', methods=['POST'])
def process_message():

    data = request.get_json()
    text = data['text']

    docs = session.get("docsearch").similarity_search(text)
    chain = load_qa_chain(OpenAI(), chain_type="stuff")
    augmented_query = docs[0].page_content + docs[1].page_content + "\n\n" + " QUESTION: " + text
    print(augmented_query)
    print(session.get("messages"))
    if session.get("messages") is not None:
        print("adding")
        if len(session.get("messages")) < 5:
            print("Actually added")
            session.get("messages").append({"role": "user", "content": "Here's some context for my question:\n" + augmented_query})
    else:
        session["messages"] = [
            {"role": "system", "content": f"You are a helpful chat bot that answers questions about PDFs"},
            {'role': 'user',
             'content': f"Here is some context for the following question:\n{augmented_query}"}
        ]
    print(session.get("messages"))
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=session.get("messages"),
        temperature=1,
    )
    if len(session.get("messages")) < 5:
        session.get("messages").append({"role": "assistant", "content": response["choices"][0]["message"]["content"]})
        if len(session.get("messages")) < 3:
            session.get("messages")[1]["content"] = text
    else:
        print("Removing the past")
        del session.get("messages")[0]

    try:
        response_text = response["choices"][0]["message"]["content"]
    except (AttributeError, IndexError):
        response_text = "Sorry, I couldn't understand that. Can you please try again?"

    return jsonify(text=response_text)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
