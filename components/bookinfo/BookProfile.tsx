import React from 'react'

export default function BookProfile() {
    return (<>
    <div>
    <ContentsTitle>저자 프로필</ContentsTitle>
    <div className="flex space-x-2 text-sm text-gray-700 border-b-[1px]">
      <p className="pb-2">
        저자{" "}
        <span
          className={cls(
            "font text-gray-600 pb-2 hover:text-gray-400 cursor-pointer",
            profileSelect ? "border-gray-800 border-b-[1px]" : ""
          )}
          onClick={profileClickHandler}
          data-index={"1"}
        >
          글쓴사람이름
        </span>
      </p>
      <span className="font text-gray-600 hover:text-gray-400 cursor-pointer">
        |
      </span>
      <p>
        번역{" "}
        <span
          className={cls(
            "font text-gray-600 pb-2 hover:text-gray-400 cursor-pointer",
            !profileSelect ? "border-gray-800 border-b-[1px]" : ""
          )}
          onClick={profileClickHandler}
          data-index={"2"}
        >
          번역한사람이름
        </span>
      </p>
    </div>
    </>)
}