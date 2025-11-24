import { post, del } from "./api";


export const uploadImagen = async (idProducto, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await post(
        `/imagenes-productos/upload/${idProducto}`,
        formData,
        true
    );
};

export const deleteImagen = (idImagen) =>
    del(`/imagenes-productos/${idImagen}`);
