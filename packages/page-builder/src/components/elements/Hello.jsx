export default function Hello({ name = "po", elemId, style = "" }) {
    return (
        <>
            <h1 id={elemId}>Hello {name}</h1>
            {style !== "" && (
                <style>
                    {style}
                </style>
            )}
        </>
    );
}
