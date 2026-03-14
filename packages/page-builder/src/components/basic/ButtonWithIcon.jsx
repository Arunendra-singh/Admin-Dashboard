import styles from "./Button.module.scss";

/* eslint-disable react/button-has-type */
const ButtonWithIcon = ({ link, type, name, iconName, elemId, style = "" }) => {
    const onClickHandler = () => {
        if (link) {
            console.log(link);
        }
    };

    return (
        <>
            <button id={elemId} className={styles.btn} onClick={onClickHandler} type={type}>
                <span className={`${iconName} icon`} />
                <span className="btnName">{name}</span>
            </button>
            {style !== "" && (
                <style>
                    {style}
                </style>
            )}
        </>
    );
};

export default ButtonWithIcon;
