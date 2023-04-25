function showHtml() {
  document.getElementById("myDiv").innerHTML = "<p class='success'>Loading</p>";
}



const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  const chatContainer = document.getElementById('chat-container');

  if (message.length > 0) {
    const userMessageElement = document.createElement('div');
    const userImageElement = document.createElement('img');
    userImageElement.src = `https://api.dicebear.com/6.x/icons/svg?seed=Oreo&icon=alarm,archive,award,bag,bandaid,bank,basket,basket2,basket3,bell,bicycle,binoculars,book,bookshelf,boombox,box,boxSeam,boxes,bricks,briefcase,brightnessHigh,brush,bucket,bug,building,calculator,camera,cameraReels,cart2,cashCoin,clock,cloud,cloudDrizzle,cloudMoon,cloudSnow,clouds,coin,compass,controller,cup,cupStraw,dice5,disc,display,doorClosed,doorOpen,dpad,droplet,easel,egg,eggFried,emojiHeartEyes,emojiLaughing,emojiSmile,emojiSmileUpsideDown,emojiSunglasses,emojiWink,envelope,eyeglasses,flag,flower1,flower2,flower3,gem,gift,globe,globe2,handThumbsUp,handbag,hdd,heart,hourglass,hourglassSplit,house,houseDoor,inbox,inboxes,key,keyboard,ladder,lamp,laptop,lightbulb,lightning,lightningCharge,lock,magic,mailbox,map,megaphone,minecart,minecartLoaded,moon,moonStars,mortarboard,mouse,mouse2,newspaper,paintBucket,palette,palette2,paperclip,pen,pencil,phone,piggyBank,pinAngle,plug,printer,projector,puzzle,router,scissors,sdCard,search,send,shop,sun,trophy,truck,truckFlatbed,webcam`;
    userImageElement.alt = 'User';
    userImageElement.width = 30;
    userImageElement.width.class = "user-profile";
    userMessageElement.style.display = 'flex';
    userMessageElement.style.alignItems = 'center';
    const userTextElement = document.createElement('p');
    userTextElement.textContent = message;
    userMessageElement.appendChild(userImageElement);
    userMessageElement.appendChild(userTextElement);
    userMessageElement.classList.add('user-message');
    chatContainer.appendChild(userMessageElement);

    const responseElement = document.createElement('div');
    const responseImageElement = document.createElement('img');
    responseImageElement.src = 'https://api.dicebear.com/6.x/icons/svg?seed=Snuggles&icon=alarm,archive,award,bag,bandaid,bank,basket,basket2,basket3,bell,bicycle,binoculars,book,bookshelf,boombox,boxSeam,boxes,bricks,briefcase,brightnessHigh,brush,bucket,bug,building,calculator,camera,cameraReels,cart2,cashCoin,clock,cloud,cloudDrizzle,cloudMoon,cloudSnow,clouds,coin,compass,controller,cup,cupStraw,dice5,disc,display,doorClosed,doorOpen,dpad,droplet,easel,egg,eggFried,emojiHeartEyes,emojiLaughing,emojiSmile,emojiSmileUpsideDown,emojiSunglasses,emojiWink,envelope,eyeglasses,flag,flower1,flower2,flower3,gem,gift,globe,globe2,handThumbsUp,handbag,hdd,heart,hourglass,hourglassSplit,house,houseDoor,inbox,inboxes,key,keyboard,ladder,lamp,laptop,lightbulb,lightning,lightningCharge,lock,magic,mailbox,map,megaphone,minecart,minecartLoaded,moon,moonStars,mortarboard,mouse,mouse2,newspaper,paintBucket,palette,palette2,paperclip,pen,pencil,phone,piggyBank,pinAngle,plug,printer,projector,puzzle,router,scissors,sdCard,search,send,shop,shopWindow,signpost,signpost2,signpostSplit,smartwatch,snow,snow2,snow3,speaker,star,stoplights,stopwatch,sun,tablet,thermometer,ticketPerforated,tornado,trash,trash2,tree,trophy,truck,truckFlatbed,tsunami,umbrella,wallet,wallet2,watch,webcam,box&radius=0'; // Replace with the image source
    responseImageElement.alt = 'Chatbot'; // Replace with the alt text
    responseImageElement.width = 30;
    responseElement.style.display = 'flex';
    responseElement.style.alignItems = 'center';
    const responseTextElement = document.createElement('p');
    responseTextElement.textContent = 'Processing your request...';
    responseElement.appendChild(responseImageElement);
    responseElement.appendChild(responseTextElement);
    responseElement.classList.add('user-message');
    chatContainer.appendChild(responseElement);

    // Send the request to the server and display the response
    const response = await fetch('/process_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });

    const responseData = await response.json();
    const responseText = responseData.text;

    responseTextElement.textContent = responseText;

    userInput.value = '';
  }
});



