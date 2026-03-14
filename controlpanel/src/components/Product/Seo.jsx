import { useState } from "react";

const Seo = () => {
    const [metaDesc, setmetaDesc] = useState(null);
    const [metaDesccount, setmetaDesccount] = useState(250);
    const maxCharacters = 250;
    const checkcharlimit = (e) => {
        const metadec = e.target.value;
        if (metadec?.length <= maxCharacters) {
            setmetaDesc(metadec);
            setmetaDesccount(maxCharacters - metadec.length);
        }
    };
    return (
        <div className="pricing-form seodata">
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group">
                        <p className="default-tag">
                            Page Title <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="PageTitle" type="text" name="PageTitle" value="" placeholder="41020 .5 oz. Custom Label Hand Saniti..." />
                    </div>
                </div>
                <div className="col-md-2 offset-1">
                    <div className="form-group">
                        <p className="default-tag">
                            Canonical Links <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="Canonical" type="text" name="Canonical" value="" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group">
                        <p className="default-tag">
                            Tags <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="Tags" type="text" name="Tags" value="" placeholder="Tag" />
                    </div>
                </div>
                <div className="col-md-2 offset-1">
                    <div className="form-group">
                        <p className="default-tag">
                            Meta Robots <span className="icon-alert-circle" />
                        </p>
                        <select name="imprintmethod">
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group">
                        <p className="default-tag">
                            Meta Keywords <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="metaKeywords" type="text" name="metaKeywords" value="" placeholder="" />
                    </div>
                </div>
                <div className="col-md-3 offset-1">
                    <div className="input-group setasdefault">
                        <label htmlFor="ExcludefromSitemap">
                            <input type="checkbox" name="ExcludefromSitemap" label="ExcludefromSitemap" autoComplete="off" id="ExcludefromSitemap" value="" />
                            <span className="checksetdefault">Exclude from Sitemap</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group">
                        <p className="default-tag">
                            ASI Keywords <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="ASIKeywords" type="text" name="ASIKeywords" value="" placeholder="" />
                    </div>
                </div>
                <div className="col-md-2 offset-1">
                    <div className="form-group">
                        <p className="default-tag">
                            SAGE Keywords <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="SAGEKeywords" type="text" name="SAGEKeywords" value="" placeholder="" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group metadescfield">
                        <p className="default-tag">
                            Meta Description <span className="icon-alert-circle" />
                        </p>
                        <textarea className="metadesc" onChange={checkcharlimit} aria-label="MetaDescription" type="text" name="MetaDescription " value={metaDesc} placeholder="" />
                        <span className="count">{metaDesccount} characters left</span>
                    </div>
                </div>
                <div className="col-md-2 offset-1">
                    <div className="form-group">
                        <p className="default-tag">
                            DC Keywords <span className="icon-alert-circle" />
                        </p>
                        <input aria-label="DCKeywords" type="text" name="DCKeywords" value="" placeholder="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Seo;
