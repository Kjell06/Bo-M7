let pageNumber = 1;
const perPage = 5;
let loading = false;

async function fetchData(page) {
  try {
    const response = await fetch(`data.json?page=${page}&perPage=${perPage}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function renderPosts(posts) {
  const container = document.getElementById('container');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    const section = document.createElement('section');
    section.innerHTML = `
      <section class="post_avatar">
      <img class="profile" src="${post.profile}">
      <p class="name">${post.name}</p>
      </section>
      <section class="post_image">
      <p class="text">${post.text}</p>
      <img class="image"  src="${post.image}">
      </section>
    `;
    postElement.appendChild(section);
    container.appendChild(postElement);
  });
}

async function loadMorePosts() {
  if (loading) return;
  loading = true;
  pageNumber++;
  const newData = await fetchData(pageNumber);
  renderPosts(newData);
  loading = false;
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMorePosts();
  }
});

(async () => {
  const initialData = await fetchData(pageNumber);
  renderPosts(initialData);
})();


async function fetchData(page) {
  try {
    const response = await fetch(`data.json?page=${page}&perPage=${perPage}`);
    const data = await response.json();
    return shuffleArray(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

