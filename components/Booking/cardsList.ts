type Card = {
  id: number;
  name: string;
  image: string;
};

const cardList: Card[] = [
  // {
  //   id: 1,
  //   name: "Visa",
  //   image: "/visa.png",
  // },
  // {
  //   id: 2,
  //   name: "Master",
  //   image: "/master.png",
  // },
  // {
  //   id: 3,
  //   name: "Google Pay",
  //   image: "/gpay.png",
  // },
  {
    id: 4,
    name: "Cash",
    image: "/cash.png",
  },
  // {
  //   id: 5,
  //   name: "Apple Pay",
  //   image: "/apple.png",
  // },
];

export const donateList: Card[] = [
  {
    id: 1,
    name: "Visa",
    image: "/visa.png",
  },
  {
    id: 2,
    name: "Master",
    image: "/master.png",
  },
];

export default cardList;
