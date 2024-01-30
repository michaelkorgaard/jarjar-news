import { v4 as uuid } from "uuid";
import { NewsType } from "../../types/NewsType";
import { UserType } from "../../types/UserType";

// Images
import jarjarImage from "../images/jarjar.png";
import r2d2Image from "../images/r2d2.png";
import c3poImage from "../images/c3po.png";
import droidImage from "../images/droid.png";
import newsImage1 from "../images/news-image1.jpg";
import newsImage2 from "../images/news-image2.jpg";
import newsImage3 from "../images/news-image3.jpg";
import newsImage4 from "../images/news-image4.jpg";
import newsImage5 from "../images/news-image5.jpg";

export let users: UserType[] = [
  {
    id: 1,
    username: "henrik",
    email: "user1@mail.com",
    role: "admin",
    password: "test",
  },
  {
    id: 2,
    username: "ole",
    email: "user2@mail.com",
    role: "admin",
    password: "test",
  },
  {
    id: 3,
    username: "masterhacker69",
    email: "user3@mail.com",
    role: "user",
    password: "test",
  },
  {
    id: 4,
    username: "tester",
    email: "user4@mail.com",
    role: "user",
    password: "test",
  },
];

export let data: NewsType[] = [
  {
    id: uuid(),
    image: newsImage1,
    title: "A news title",
    text: "Mesa called Jar Jar Binks, mesa your humble servant",
    createdBy: "Jar jar",
    createdImage: jarjarImage,
    createdDate: new Date(),
    likes: 1,
    dislikes: 9,
    hate: 66,
    love: 333,
    comments: [
      {
        id: uuid(),
        text: "Sir, it's very possible this asteroid is not stable",
        createdBy: "C3P0",
        createdImage: c3poImage,
        createdDate: new Date(),
        likes: 10,
        dislikes: 5,
        hate: 66,
        love: 333,
        comments: [
          {
            id: uuid(),
            text: "3. niveau",
            createdBy: "C3P0",
            createdImage: c3poImage,
            createdDate: new Date(),
            likes: 7,
            dislikes: 3,
            hate: 66,
            love: 333,
            comments: [],
          },
          {
            id: uuid(),
            text: "3 niveau",
            createdBy: "C3P0",
            createdImage: c3poImage,
            createdDate: new Date(),
            likes: 10,
            dislikes: 10,
            hate: 66,
            love: 333,
            comments: [],
          },
        ],
      },
      {
        id: uuid(),
        text: "I suggest a new strategy, Artoo: let the Wookie win",
        createdBy: "C3P0",
        createdImage: c3poImage,
        createdDate: new Date(),
        likes: 0,
        dislikes: 0,
        hate: 66,
        love: 333,
        comments: [],
      },
      {
        id: uuid(),
        text: "Roger, roger",
        createdBy: "B1 battle droid",
        createdImage: droidImage,
        createdDate: new Date(),
        likes: 110,
        dislikes: 110,
        hate: 66,
        love: 333,
        comments: [],
      },
    ],
  },
  {
    id: uuid(),
    image: newsImage2,
    title: "A news title",
    text: "Bleep boop, beep beep",
    createdBy: "R2-D2",
    createdImage: undefined,
    createdDate: new Date(),
    likes: 0,
    dislikes: 0,
    hate: 66,
    love: 333,
    comments: [],
  },
  {
    id: uuid(),
    image: newsImage3,
    title: "A news title",
    text: "Yousa should follow me now, okay? My warning yous: Gungans no like outsiders. Do not 'spect a warm welcome.",
    createdBy: "Jar Jar",
    createdImage: jarjarImage,
    createdDate: new Date(),
    likes: 0,
    dislikes: 0,
    hate: 66,
    love: 333,
    comments: [],
  },
  {
    id: uuid(),
    image: newsImage4,
    title: "A news title",
    text: "The BOOOM! Getin very scared and grabin that Jedi, the path mesa here",
    createdBy: "Jar Jar",
    createdImage: jarjarImage,
    createdDate: new Date(),
    likes: 0,
    dislikes: 0,
    hate: 66,
    love: 333,
    comments: [],
  },
  {
    id: uuid(),
    image: newsImage5,
    title: "A news title",
    text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    createdBy: "Jar Jar",
    createdImage: jarjarImage,
    createdDate: new Date(),
    likes: 10,
    dislikes: 10,
    hate: 66,
    love: 333,
    comments: [],
  },
];

// IndexedDB
// const indexedDB = window.indexedDB;
// const request = indexedDB.open("UsersDB", 1);

// request.onerror = function (event) {
//   console.log("error", event);
// };

// request.onupgradeneeded = function () {
//   const db = request.result;
//   const store = db.createObjectStore("users", { keyPath: "id" });
//   store.createIndex("users_username", ["username"], { unique: true });
//   store.createIndex("users_role", ["role"], { unique: false });
//   store.createIndex("users_password", ["password"], { unique: false });
//   console.log("db", db);
// };

// request.onsuccess = function () {
//   console.log("Database opened successfully");

//   const db = request.result;
//   const transaction = db.transaction("users", "readwrite");
//   const store = transaction.objectStore("users");
//   const usernameIndex = store.index("users_username");
//   const roleIndex = store.index("users_role");
//   const passwordIndex = store.index("users_password");

//   users.forEach((user) => {
//     store.put(user);
//   });

//   const idQuery = store.get(4);

//   idQuery.onsuccess = function () {
//     console.log("idQuery", idQuery.result);
//   };

//   transaction.oncomplete = function () {
//     db.close();
//   };
// };
