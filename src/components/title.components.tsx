import Link from "next/link";
import React from "react";

interface TitleProps {
  title: string;
  addPath: string;
}

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <section className="flex flex-row justify-between items-center">
      <h1 className="text-6xl font-bold">{props.title}</h1>
      <Link
        className="aspect-square h-8 bg-white text-black flex justify-center items-center hover:opacity-80"
        href={props.addPath}
      >
        <div className="">+</div>
      </Link>
    </section>
  );
};

interface DetailTitleProps {
  title: string;
  editPath: string;
  children?: ({
    style,
  }: {
    style: { [key: string]: string };
  }) => React.ReactNode;
}

export const DetailTitle: React.FC<DetailTitleProps> = (props) => {
  const style = {
    delete: "text-white bg-red-600 hover:opacity-80 px-3 py-2 cursor-pointer",
  };

  return (
    <section className="flex flex-row justify-between items-center">
      <h1 className="text-4xl font-bold">{props.title}</h1>
      <div className="flex flex-row">
        <Link
          className="bg-white text-black hover:opacity-80 px-3 py-2"
          href={props.editPath}
        >
          Edit
        </Link>
        {props.children && props.children({ style })}
      </div>
    </section>
  );
};

interface AddTitleProps {
  title: string;
  children: React.ReactNode;
}

export const AddTitle: React.FC<AddTitleProps> = (props) => {
  return (
    <section className="flex flex-row justify-between items-center">
      <h1 className="text-4xl font-bold">{props.title}</h1>
      {props.children}
    </section>
  );
};
