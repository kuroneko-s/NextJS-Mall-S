import React from "react";
import styled from "styled-components";
import BookAuthor from "./BookAuthor";
import BookScore from "./BookScore";
import BookTitle from "./BookTitle";
import { BookInfo } from "@lib/interface/tables";

interface BookListGridProps {
  bookInfoList: BookInfo[] | [];
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
                    <ImageItem
                      imageUrl={bookInfoList[v].image_path ? "red" : "blue"}
                    />
                    <p className="flex-grow-[0.5] text-center">{v + 1}</p>
                    <div className="flex-grow text-start">
                      <BookTitle
                        id={bookInfoList[v].title}
                        title={bookInfoList[v].title}
                      />
                      <BookAuthor
                        id={bookInfoList[v].writer_id}
                        title={bookInfoList[v].writer_id}
                      />
                      <BookScore score={bookInfoList[v].score} />
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
