import { Book } from "@lib/client/common";
import React from "react";
import styled from "styled-components";
import BookAuthor from "./BookAuthor";
import BookScore from "./BookScore";
import BookTitle from "./BookTitle";

interface BookListGridProps {
  bookInfoList: Book[];
  title: string;
}

const Container = styled.div`
  width: 100%;
`;

const Contents = styled.div`
  display: flex;
`;

const Items = styled.div`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ImageItemProps {
  imageUrl: string;
}

const ImageItem = styled.div<ImageItemProps>`
  width: 110px;
  height: 140px;
  background-color: ${(props) => props.imageUrl};
  border-radius: 0.35rem;
`;

export default function BookListGrid({
  bookInfoList,
  title,
}: BookListGridProps) {
  const sampleList = [...bookInfoList, ...bookInfoList].slice(0, 9);
  return (
    <Container className="mb-6">
      <div>
        <p className="font-bold text-2xl mb-4">{title}</p>
      </div>
      <Contents>
        {[1, 2, 3].map((_, idx) => {
          idx *= 3;
          return (
            <Items key={idx} className="space-y-2">
              {[idx, idx + 1, idx + 2].map((v, idx) => {
                return (
                  <Item key={idx}>
                    <ImageItem imageUrl={sampleList[v].imageUrl} />
                    <p className="flex-grow-[0.5] text-center">{v + 1}</p>
                    <div className="flex-grow text-start">
                      <BookTitle
                        id={sampleList[v].title}
                        title={sampleList[v].title}
                      />
                      <BookAuthor
                        id={sampleList[v].author}
                        title={sampleList[v].author}
                      />
                      <BookScore score={sampleList[v].score} />
                    </div>
                  </Item>
                );
              })}
            </Items>
          );
        })}
      </Contents>
    </Container>
  );
}
