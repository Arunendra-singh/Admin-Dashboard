const headingDD = [{
    alias: "h1",
    name: "Heading 1"
},
{
    alias: "h2",
    name: "Heading 2"
},
{
    alias: "h3",
    name: "Heading 3"
},
{
    alias: "h4",
    name: "Heading 4"
},
{
    alias: "h5",
    name: "Heading 5"
},
{
    alias: "h6",
    name: "Heading 6"
}];

const linkDD = [{
    alias: "_blank",
    name: "Blank"
}, {
    alias: "_self",
    name: "Self"
}, {
    alias: "_parent",
    name: "Parent"
}, {
    alias: "_top",
    name: "Top"
}];

const buttonDD = [
    {
        alias: "button",
        name: "Button"
    },
    {
        alias: "submit",
        name: "Submit"
    },
    {
        alias: "reset",
        name: "Reset"
    }
];

const selectDropDown = {
    Headings: headingDD,
    Links: linkDD,
    Buttons: buttonDD
};

export default selectDropDown;
