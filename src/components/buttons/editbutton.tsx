import React, { useState, useEffect } from "react";

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  externalId: string;
}

const EditButton = ({ onClick }: IProps) => {
  return (
    <div className="m-2">
      <button
        className=" inline-flex justify-center py-2 px-4 bg-indigo-600 text-white mt-1 rounded-md text-sm font-medium"
        onClick={onClick}
      >
        Edit Product
      </button>
    </div>
  );
};

export default EditButton;
