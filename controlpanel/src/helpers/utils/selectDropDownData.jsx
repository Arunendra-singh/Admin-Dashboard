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

const linkDD = [
    {
        alias: "none",
        name: "None"
    },
    {
        alias: "_blank",
        name: "Blank"
    },
    {
        alias: "_self",
        name: "Self"
    },
    {
        alias: "_parent",
        name: "Parent"
    },
    {
        alias: "_top",
        name: "Top"
    }
];

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

const imagesizeDD = [
    {
        alias: "custom",
        name: "Custom"
    },
    {
        alias: "none",
        name: "none"
    }
];

const sizeDD = [
    {
        alias: "px",
        name: "PX"
    },
    {
        alias: "rem",
        name: "REM"
    }
];

const bordertypeDD = [
    {
        alias: "none",
        name: "None"
    },
    {
        alias: "solid",
        name: "Solid"
    },
    {
        alias: "dashed",
        name: "Dashed"
    },
    {
        alias: "dotted",
        name: "Dotted"
    },
    {
        alias: "groove",
        name: "Groove"
    },
    {
        alias: "inset",
        name: "Inset"
    },
    {
        alias: "outset",
        name: "Outset"
    },
    {
        alias: "ridge",
        name: "Ridge"
    },
    {
        alias: "double",
        name: "Double"
    }
];

const borderradiusDD = [
    {
        alias: "px",
        name: "PX"
    },
    {
        alias: "rem",
        name: "REM"
    }
];

const fontweightDD = [
    {
        alias: "normal",
        name: "normal"
    },
    {
        alias: "bold",
        name: "bold"
    },
    {
        alias: "200",
        name: "200"
    },
    {
        alias: "400",
        name: "400"
    },
    {
        alias: "600",
        name: "600"
    },
    {
        alias: "700",
        name: "700"
    },
    {
        alias: "900",
        name: "900"
    }
];

const textTransformationsDD = [
    {
        alias: "unset",
        name: "unset"
    },
    {
        alias: "none",
        name: "none"
    },
    {
        alias: "uppercase",
        name: "uppercase"
    },
    {
        alias: "lowercase",
        name: "lowercase"
    },
    {
        alias: "capitalize",
        name: "capitalize"
    }
];
const fontFamilyDD = [
    {
        alias: "Euclid Circular B",
        name: "Euclid Circular B"
    },
    {
        alias: "Serif",
        name: "Serif"
    },
    {
        alias: "Sans-serif",
        name: "Sans-serif"
    },
    {
        alias: "Monospace",
        name: "Monospace"
    },
    {
        alias: "Cursive",
        name: "Cursive"
    },
    {
        alias: "fantasy",
        name: "fantasy"
    },
    {
        alias: "initial",
        name: "initial"
    },
    {
        alias: "auto",
        name: "auto"
    }
];

const selectDropDown = {
    Headings: headingDD,
    Links: linkDD,
    Buttons: buttonDD,
    Imagesize: imagesizeDD,
    Size: sizeDD,
    BorderType: bordertypeDD,
    BorderRadius: borderradiusDD,
    fontFamily: fontFamilyDD,
    fontWeight: fontweightDD,
    textTransform: textTransformationsDD
};

export default selectDropDown;
