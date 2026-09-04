// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// [x] 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title

async function fetchPosts(){
    try {
        const res = await fetch(`${BASE_URL}/posts`)
        const posts = await res.json()

        const overview = posts.slice(0, 5)
        overview.forEach(post => console.log(post.title));

        return overview;
    } catch {
        console.log("Failed to load posts")
    }
}

// [x] 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

// [x] 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object

async function getPostById(id) {
    const res = await fetch(`${BASE_URL}/posts/${id}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    return await res.json()
}

// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it.

(async () => {
    try{
        const postA = await getPostById(1);
        console.log(`a: ${postA}`)
    } catch(err){
        console.log(`Failed to load post A`, err.message)
    }

    try{
        const postB = await getPostById(99999)
        console.log(`b: ${postB}`)
    } catch(err) {
        console.log(`Failed to load post B`, err.message)
    }
})();
