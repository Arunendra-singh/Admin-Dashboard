import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useEffect} from "react";
const Filters3 = ({ primaryFilter, setIsSelected, searchString , customClassName, secondaryFilter, onReset, getSearchFilterVal, exportLink, data }) => {
   
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
    const submitPrimaryValue = (data) => {
        getSearchFilterVal(data)
    }
    
    const handleClick = (e,type) => {
       
        if(type == "date"){
            e.target.max = new Date().toISOString().split('T')[0]
            e.target.showPicker()
        }
       
    }
    const handleOnSelect = (item) => {
        setIsSelected(item.name);
    }
    return (
        <div className={`${customClassName} filterType2`}>
            <form onSubmit={handleSubmit(submitPrimaryValue)} >
                <div className="d-flex flex-wrap w-100">
                    <div className="box1 box1Extra d-flex align-items-center flex-wrap w-100">
                        {primaryFilter?.map((filter) => (
                            <>
                            {filter?.type != "select" ? (
                                <div className={`${filter?.label ? 'form-group col-md-3 col-sm-6 mb-3' : 'otherClassName'} ${filter?.type == "date" && "formdate"}`}>
                                <label htmlFor={filter?.key}>{filter?.label}</label>
                                 
                                 <input 
                                    type={filter?.type} 
                                    placeholder={filter?.placeholder}
                                    key={filter?.key}
                                    name={filter?.name}
                                    _maxLength={30}
                                   
                                    className="form-control ui-autocomplete-input"
                                    onClick={(e) => handleClick(e,filter?.type)}
                                    {...register(filter?.name, {
                                        
                                    })}
                                 
                                />
                            
                               
                            </div>
                            ):(
                                <div className="form-group col-md-3 col-sm-6 mb-3">
                                <label htmlFor={filter?.key}>{filter?.label}</label>
                               <select 
                               className="form-control"
                               name={filter?.name} 
                               required={filter?.required}
                               {...register(filter?.name, )}
                           >
                              
                               <option key="Select" value="Select" >Select</option>
                           </select>
                               </div>
                            )}
                            </>
                        ))}
                   
                    </div>
                    <div className="box2 box1 box1Extra d-flex align-items-center flex-wrap w-100 gap-0">
                            
                       {secondaryFilter?.map((filter) => (
                            <>
                               
                                {
                                    filter?.type != "select" ? (
                                        
                                        <div className={`${filter?.label ? 'form-group col-md-3 col-sm-6 mb-3' : 'otherClassName'} ${filter?.type == "date" && "formdate"}`}>
                                         <label htmlFor={filter?.key}>{filter?.label}</label>
                                         <input 
                                            type={filter?.type} 
                                            placeholder={filter?.placeholder}
                                            key={filter?.key}
                                            name={filter?.name}
                                            className="form-control ui-autocomplete-input"
                                            onClick={(e) => handleClick(e,filter?.type)}
                                            {...register(filter?.name)}
                                        />
                                        </div>
                                       
                                    ) : (
                                        
                                        <div className="form-group col-md-3 col-sm-6 mb-3">
                                         <label htmlFor={filter?.key}>{filter?.label}</label>
                                        <select 
                                        className="form-control"
                                        name={filter?.name} 
                                        required={filter?.required}
                                        {...register(filter?.name, )}
                                    >
                                        
                                    </select>
                                        </div>
                                        
                                    )
                                        
                                }
                            </>
                        ))}
                      
                        <div className="form-group col-lg-3 col-sm-3 mb-3 mt-0">
                        <ul className="newaction right-btn d-flex">
                            <li>
                                <button onSubmit={handleSubmit(submitPrimaryValue)} value="Search"  className="btn btn-search" id="cpContent_btnDateSearch">Search</button>
                            </li>
                            <li>
                                <button type="submit" value="Reset" className="btn  btn-reset"  id="cpContent_btnResetDate" onClick={() => { reset(); onReset()}}>Reset</button>
                            </li>
                            <li><button type="button" id="cpContent_btnExport" className="btn btn-export export-icon" value="Export" onClick={()=> window.open(exportLink, "_blank", "noreferrer")}>Export</button></li>
                        </ul>
                        </div>
                        </div>
                
            </div>
                   
            </form>
        </div>
    )
}
export default Filters3;