import styles from "./Button.module.scss";

/* eslint-disable react/button-has-type */
const Button = ({ link, type, name, elemId, style = "" }) => {
    const onClickHandler = () => {
        if (link) {
            alert(link);
        }
    };

    return (
        <>
            <button id={elemId} className={styles.btn} onClick={onClickHandler} type={type}>{name}</button>
            {style !== "" && (
                <style>
                    {style}
                </style>
            )}
        </>
    );
};

export default Button;
