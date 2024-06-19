import React from "react";

interface MoreButtonProps {
    handleButton: () => void;

}

const MoreButton: React.FC<MoreButtonProps> = ({handleButton}) => {
    return (
        <button
            className="
                    mt-5
                    w-1/6
                    mx-auto
                    block
                    bg-blue-600
                    p-2
                    rounded-2xl
                    hover:bg-blue-700
                    active:scale-90
                    transition
                    "
            onClick={handleButton}>
            More
        </button>
    );
};

export default MoreButton;
