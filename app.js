const text = `
  [[strong]]Finally[[/strong]]

  [[underline]]Call me[[/underline]], when you get time.


  

  - For [[underline]]Swathi[[/underline]]


  
`;

let i = 0;
const container = document.querySelector(".text");
let currentSpan = null;
let autoScrollEnabled = true;

const scrollContainer = document.querySelector(".scroll");

scrollContainer.addEventListener("wheel", () => {
  if (scrollContainer.scrollTop + scrollContainer.clientHeight < scrollContainer.scrollHeight) {
    autoScrollEnabled = false;
  }
});

scrollContainer.addEventListener("touchstart", () => {
  autoScrollEnabled = false;
});



function autoScroll() {
  if (!autoScrollEnabled) return;

  const scroll = document.querySelector(".scroll");
  scroll.scrollTo({
    top: scroll.scrollHeight,
    behavior: "smooth"
  });
}

function typeWriter(text) {
  if (i >= text.length) return;

  autoScroll();

  // [[imageX - path: ...]]
  if (text.startsWith('[[image', i)) {
    const end = text.indexOf(']]', i);
    if (end !== -1) {
      const token = text.substring(i + 2, end); 
      // token example: "image1 - path: images/image1.jpg"

      const match = token.match(/path:\s*([^\]]+)/);
      if (match) {
        const imgPath = match[1].trim();

        // create image container
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-container';

        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = 'I know, you won\'t be able to see this, but I want to tell you, I Like You';

        imgWrapper.appendChild(img);
        container.appendChild(imgWrapper);

        // trigger expansion
        setTimeout(() => {
          imgWrapper.classList.add('expand');
          autoScroll();
        }, 100);

        // pause typing for emotional effect
        i = end + 2;
        return setTimeout(typeWriter, 800, text);
      }
    }
  }


  // [[highlight]]
  if (text.startsWith('[[highlight]]', i)) {
    currentSpan = document.createElement('span');
    currentSpan.className = 'highlight';
    container.appendChild(currentSpan);
    i += 13;
    return setTimeout(typeWriter, 0, text);
  }

  if (text.startsWith('[[/highlight]]', i)) {
    currentSpan = null;
    i += 14;
    return setTimeout(typeWriter, 0, text);
  }

  // [[underline]]
  if (text.startsWith('[[underline]]', i)) {
    currentSpan = document.createElement('span');
    currentSpan.className = 'underline';
    container.appendChild(currentSpan);
    i += 13;
    return setTimeout(typeWriter, 0, text);
  }

  if (text.startsWith('[[/underline]]', i)) {
    currentSpan = null;
    i += 14;
    return setTimeout(typeWriter, 0, text);
  }

  // [[strong]]
  if (text.startsWith('[[strong]]', i)) {
    currentSpan = document.createElement('span');
    currentSpan.className = 'strong';
    container.appendChild(currentSpan);
    i += 10;
    return setTimeout(typeWriter, 0, text);
  }

  if (text.startsWith('[[/strong]]', i)) {
    currentSpan = null;
    i += 11;
    return setTimeout(typeWriter, 0, text);
  }

  // Normal character
  const charNode = document.createTextNode(text.charAt(i));
  (currentSpan || container).appendChild(charNode);
  i++;

  setTimeout(typeWriter, 30, text);
}

typeWriter(text);