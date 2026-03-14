const Link = ({ link, title, name, target, elemId, style = "" }) => (
    <>
        <a id={elemId} href={link} target={target} title={title}>{name}</a>
        {style !== "" && (
            <style>
                {style}
            </style>
        )}
    </>
);

export default Link;
