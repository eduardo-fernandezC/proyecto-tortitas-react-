import React from "react";
import "./../../styles/components/atoms/loader-fullscreen.css";
import { Loader } from "./Loader";

export const LoaderFullscreen = ({ text = "Cargando..." }) => {
    return (
        <div className="loader-fullscreen">
            <Loader />
            <h4 className="text-center mt-3">{text}</h4>
        </div>
    );
};
