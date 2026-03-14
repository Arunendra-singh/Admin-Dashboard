import { useForm } from "react-hook-form";

const Filters = ({ primaryFilter, customClassName, secondaryFilter, onReset, getSearchFilterVal, exportLink }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();

    const submitPrimaryValue = (data) => {
        getSearchFilterVal(data);
    };

    return (
        <div className={`${customClassName} filterType2`}>
            <form onSubmit={handleSubmit(submitPrimaryValue)}>
                <div className="box1 box1Extra">
                    <div className="formdata1">
                        {primaryFilter?.map((filter) => (
                            <input
                                type={filter?.type}
                                placeholder={filter?.placeholder}
                                key={filter?.key}
                                name={filter?.name}
                                className="form-control ui-autocomplete-input"
                                {...register(filter?.name, {
                                    //required : filter?.required
                                })}
                            />
                        ))}
                        <br />
                        <ul className="newaction left-search">
                            <li>
                                <button onSubmit={handleSubmit(submitPrimaryValue)} value="Search" className="btn btn-search" id="cpContent_btnDateSearch">
                                    Search
                                </button>
                            </li>
                            <li>
                                <button
                                    type="submit"
                                    value="Reset"
                                    className="btn  btn-reset"
                                    id="cpContent_btnResetDate"
                                    onClick={() => {
                                        reset();
                                        onReset();
                                    }}
                                >
                                    Reset
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="box2">
                    <div className="FormDatafilter">
                        {/* <form onSubmit={submitSecondaryForm(submitSecondaryValue)}> */}

                        {secondaryFilter?.map((filter) => (
                            <>
                                {filter?.type != "select" ? (
                                    // <div className="formgroup">
                                    <div className={`${filter?.label ? "formGroup" : "otherClassName"} ${filter?.type == "date" && "formdate"}`}>
                                        <label htmlFor={filter?.key}>{filter?.label}</label>
                                        <input type={filter?.type} placeholder={filter?.placeholder} key={filter?.key} name={filter?.name} className="form-control ui-autocomplete-input" {...register(filter?.name)} />
                                    </div>
                                ) : (
                                    <div className="formgroup">
                                        <label htmlFor={filter?.key}>{filter?.label}</label>
                                        <select className="form-control" name={filter?.name} required={filter?.required} {...register(filter?.name)}>
                                            {filter?.options.map((option, index) => (
                                                <option key={index} value={option?.value}>
                                                    {option?.key}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </>
                        ))}

                        {/* <ul>  
                            <li className="so_div">
                                <input id="cpContent_chkSO" type="checkbox" name="ctl00$cpContent$chkSO" />
                                <label htmlFor="cpContent_chkSO">SO</label>
                            </li>

                            <li className="so_div">
                                <input id="cpContent_chkFO" type="checkbox" name="ctl00$cpContent$chkFO" />
                                <label htmlFor="cpContent_chkFO">FO</label>
                            </li>
                        </ul> */}
                    </div>
                    <ul className="newaction right-btn">
                        <li>
                            <button onSubmit={handleSubmit(submitPrimaryValue)} value="Search" className="btn btn-search" id="cpContent_btnDateSearch">
                                Search
                            </button>
                        </li>
                        <li>
                            <button
                                type="submit"
                                value="Reset"
                                className="btn  btn-reset"
                                id="cpContent_btnResetDate"
                                onClick={() => {
                                    reset();
                                    onReset();
                                }}
                            >
                                Reset
                            </button>
                        </li>

                        {/* <li><button type="button" id="cpContent_btnExport" className="btn btn-export export-icon" value="Export" onClick={()=> window.open(exportLink, "_blank", "noreferrer")}>Export</button></li> */}
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default Filters;
