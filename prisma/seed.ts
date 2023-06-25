import { BuyHistory, Category, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  // 날짜 삭제
  // await prismaClient.date_v.deleteMany({});

  // 날짜 더미 생성
  // dateViewer();

  buyHistory();

  /* new Promise((resolve) => {
    initArtist();
    initCategory();
    initPublisher();
    initTranslator();
    initWriter();
    initBookSeries();
    initEvent();

    setTimeout(() => {
      resolve(undefined);
    }, 15000);
  }).then(() => {
    new Promise((resolve) => {
      initBook();

      setTimeout(() => {
        resolve(undefined);
      }, 5000);
    }).then(() => {
      initBookAndBookSeries();
      initEventAndBook();
      initEventAndCategory();
    });
  }); */
}

function initArtist() {
  for (let i = 0; i < 20; i++) {
    setTimeout(async () => {
      const artist = await prismaClient.artist.create({
        data: {
          name: "artist name " + i,
          description: "artist description sample context. test_" + i,
          nationality: "korea",
          birth: "1995-02-13",
          education: "초등학교\n 중학교\n 대학교\n",
          career: `IT기업 근무 ${i}년차`,
          awards: "상없음 " + i,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 100);
  }
}

function initCategory() {
  new Promise((resolve) => {
    const categoryArr: Category[] = [];
    for (let i = 0; i < 10; i++) {
      setTimeout(async () => {
        const category = await prismaClient.category.create({
          data: {
            name: "category_" + i,
            parentName: "#",
            useYn: i % 3 === 0 ? "N" : "Y",
            createUser: "1000000",
            updateUser: "1000000",
          },
        });
        categoryArr.push(category);
      }, 200);
    }

    setTimeout(() => {
      resolve([...categoryArr]);
    }, 2100);
  })
    //@ts-ignore
    .then((result: Category[]) => {
      for (let i = 0; i < 20; i++) {
        setTimeout(async () => {
          await prismaClient.category.create({
            data: {
              name: "category_" + (i + 10),
              parentName: result[i % 10]?.name ?? "#",
              useYn: i % 3 === 0 ? "N" : "Y",
              createUser: "1000000",
              updateUser: "1000000",
            },
          });
        }, 1000);
      }
    });
}

function initPublisher() {
  return new Promise((resolve, reject) => {
    const resultArr = [];
    const iteratorCnt = 20;

    for (let i = 0; i < iteratorCnt; i++) {
      setTimeout(async () => {
        const publisher = await prismaClient.publisher.create({
          data: {
            name: "publisher name " + i,
            description: "publisher description sample context. test_" + i,
            nationality: "korea",
            birth: "1995-02-13",
            education: "초등학교\n 중학교\n 대학교\n",
            career: `IT기업 근무 ${i}년차`,
            awards: "상없음 " + i,
            createUser: "1000000",
            updateUser: "1000000",
          },
        });

        resultArr.push(publisher);
      }, 1000);
    }
  });
}

function initTranslator() {
  for (let i = 0; i < 20; i++) {
    setTimeout(async () => {
      await prismaClient.translator.create({
        data: {
          name: "translator name " + i,
          description: "translator description sample context. test_" + i,
          nationality: "korea",
          birth: "1995-02-13",
          education: "초등학교\n 중학교\n 대학교\n",
          career: `IT기업 근무 ${i}년차`,
          awards: "상없음 " + i,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

function initWriter() {
  for (let i = 0; i < 20; i++) {
    setTimeout(async () => {
      await prismaClient.writer.create({
        data: {
          name: "writer name " + i,
          description: "writer description sample context. test_" + i,
          nationality: "korea",
          birth: "1995-02-13",
          education: "초등학교\n 중학교\n 대학교\n",
          career: `IT기업 근무 ${i}년차`,
          awards: "상없음 " + i,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

async function initBook() {
  const artistList = await prismaClient.artist.findMany();
  const writerList = await prismaClient.writer.findMany();
  const translatorList = await prismaClient.translator.findMany();
  const categoryList = await prismaClient.category.findMany();
  const publisherList = await prismaClient.publisher.findMany();

  for (let i = 0; i < 20; i++) {
    setTimeout(async () => {
      const writerLen = writerList.length;
      const translatorLen = translatorList.length;
      const categoryLen = categoryList.length;
      const artistLen = artistList.length;
      const publisherLen = publisherList.length;

      await prismaClient.book.create({
        data: {
          writerId:
            writerLen > i
              ? writerList[i % writerLen].id
              : writerList[writerLen].id,
          translatorId:
            translatorLen > i
              ? translatorList[i % translatorLen].id
              : translatorList[translatorLen].id,
          categoryId:
            categoryLen > i
              ? categoryList[i % categoryLen].id
              : categoryList[categoryLen].id,
          artistId:
            artistLen > i
              ? artistList[i % artistLen].id
              : artistList[artistLen].id,
          publisherId:
            publisherLen > i
              ? publisherList[i % publisherLen].id
              : publisherList[publisherLen].id,
          title: `book title ${i}`,
          price: (i + 1000) * 100,
          bookDescription: `sample book description ${i}`,
          listeningYn: i % 2 === 0 ? "Y" : "N",
          macYn: i % 2 === 0 ? "Y" : "N",
          windowYn: i % 2 === 0 ? "Y" : "N",
          androidYn: i % 2 === 0 ? "Y" : "N",
          iosYn: i % 2 === 0 ? "Y" : "N",
          fileType: "TXT",
          fileSize: `${(i + 10) % 20} MB`,
          textCount: `${Math.floor(((i + 10) % 20) / 2)} 자`,
          bookContents: `책 내용 대충 갈겨넣기 ${i}`,
          score: "0",
          imagePath: `/book_${i}.jpg`,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

function initBookSeries() {
  for (let i = 0; i < 5; i++) {
    setTimeout(async () => {
      await prismaClient.bookSeries.create({
        data: {
          name: "Sample Series " + i,
          finishYn: "N",
          count: 1,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

async function initEvent() {
  for (let i = 1; i < 10; i++) {
    setTimeout(async () => {
      await prismaClient.event.create({
        data: {
          filePath: `/event_${i}.png`,
          title: `이벤트 제목_${i}`,
          contents: `이벤트 내용입니다. (${i})`,
          useYn: "Y",
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

async function initEventAndBook() {
  const bookList = await prismaClient.book.findMany();
  const eventList = await prismaClient.event.findMany();

  for (let i = 0; i < eventList.length; i++) {
    for (let j = i; j < i + 6; j++) {
      setTimeout(async () => {
        await prismaClient.eventAndBook.create({
          data: {
            bookId: bookList[j].isbn,
            evnetId: eventList[i].id,
            createUser: "1000000",
            updateUser: "1000000",
          },
        });
      }, 1000);
    }
  }
}

async function initEventAndCategory() {
  const categoryList = await prismaClient.category.findMany();
  const eventList = await prismaClient.event.findMany();

  for (let i = 0; i < eventList.length; i++) {
    await prismaClient.eventAndCategory.create({
      data: {
        categoryId: categoryList[i].id,
        eventId: eventList[i].id,
        createUser: "1000000",
        updateUser: "1000000",
      },
    });
  }
}

async function initBookAndBookSeries() {
  const bookList = await prismaClient.book.findMany();
  const seriesList = await prismaClient.bookSeries.findMany();

  for (let i = 0; i < 5; i++) {
    setTimeout(async () => {
      await prismaClient.bookAndBookSeries.create({
        data: {
          bookId: bookList.length < 5 ? i : bookList[i].isbn,
          bookseriesId: seriesList.length < 5 ? i : seriesList[i].id,
          createUser: "1000000",
          updateUser: "1000000",
        },
      });
    }, 1000);
  }
}

async function dateViewer() {
  const cnt = 365 * 3 + 366;

  for (let i = 0; i < cnt; i++) {
    const flagDate = new Date("2023-01-01");
    flagDate.setDate(flagDate.getDate() + i);

    const year = flagDate.getFullYear();
    const month =
      flagDate.getMonth() + 1 < 10
        ? "0" + (flagDate.getMonth() + 1)
        : flagDate.getMonth() + 1;
    const date =
      flagDate.getDate() < 10 ? "0" + flagDate.getDate() : flagDate.getDate();

    await prismaClient.date_v.upsert({
      where: {
        date: flagDate,
      },
      update: {
        yyyymm: `${year}${month}`,
        yyyymmdd: `${year}${month}${date}`,
      },
      create: {
        date: flagDate,
        yyyymmdd: `${year}${month}${date}`,
        yyyymm: `${year}${month}`,
      },
    });
  }
}

async function buyHistory() {
  let user = {
    userId: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
    aid: "",
    cid: "TC0ONETIME",
    tid: "",
    paymentType: "MONEY",
    partnerOrderId: "RIDI0CLONEITEMS5",
    partnerUserId: "RIDI0CLONEUSERvRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
    itemName: "",
    itemCode: "",
    quantity: 1,
    totalAmount: 101900,
    vatAmount: 0,
    redirectMobile:
      "https://online-pay.kakao.com/mockup/v1/3624a5bbce9b6eeda60a20e1115b8bfc74f645edc98209d64cdd6780a6f28ed8/mInfo",
    redirectApp:
      "https://online-pay.kakao.com/mockup/v1/3624a5bbce9b6eeda60a20e1115b8bfc74f645edc98209d64cdd6780a6f28ed8/aInfo",
    redirectPc:
      "https://online-pay.kakao.com/mockup/v1/3624a5bbce9b6eeda60a20e1115b8bfc74f645edc98209d64cdd6780a6f28ed8/info",
    success: true,
    errorCode: null,
    errorMsg: null,
    paymentCreated: "2023-06-25T11:19:22",
    paymentApproved: "2023-06-25T11:19:43",
    expirationPeriod: "2023-06-25T11:19:21",
    createUser: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
    updateUser: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
  };

  let targetDate = new Date("2022-06-01");
  let cnt = 0;

  for (let i = 0; i < 100; i++) {
    user.aid = Math.random().toString(16).substring(2);
    user.tid = Math.random().toString(16).substring(2);
    user.itemName = "buyHistory sample data " + i;
    user.itemCode = i + "";
    user.totalAmount = 1000 * i + 10000;

    if (cnt === 5) {
      targetDate.setDate(targetDate.getDate() + 1);
      cnt = 0;
    }

    user.paymentCreated = targetDate.toISOString().substring(0, 19);
    user.paymentApproved = targetDate.toISOString().substring(0, 19);
    user.expirationPeriod = targetDate.toISOString().substring(0, 19);

    cnt++;

    await prismaClient.buyHistory.create({
      // @ts-ignore
      data: {
        ...user,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prismaClient.$disconnect());
