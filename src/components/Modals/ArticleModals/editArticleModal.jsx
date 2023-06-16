import React from "react";

const EditArticle = ({ role, setModal, handleUpdate, values, setValues }) =>
{
    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }    
    return (
        <div className="addArticle">
            <div className="addArticle_inner">
                <div className="addArticle_topHead">
                    <p>Edit Article</p>
                    <i onClick={() => setModal("")} className="cross fas fa-times"></i>
                </div>

                <div className="addArticle_wrapper">
                    <div className="addArticle_inputWrapper">
                        <div>
                            <label>ID</label>
                            <input onChange={handleInput} disabled value={values?.id} name='id' type="text" placeholder="Enter unique id" />
                        </div>

                        <div>
                            <label>Date</label>
                            <input type="date" onChange={handleInput} name='date' value={values?.date}/>
                        </div>
                    </div>

                    <div className="addArticle_inputWrapper">
                        <div>
                            <label>Title</label>
                            <input type="text" placeholder="Enter Title" onChange={handleInput} name='title' value={values?.title}/>
                        </div>

                        <div>
                            <label>Author</label>
                            <input type="text" placeholder="Author" onChange={handleInput} name='author' value={values?.author}/>
                        </div>
                    </div>
                </div>
                <div className="addArticle_inputWrapperFull">
                        <div>
                            <label>Designation</label>
                            <input type="text" placeholder="Enter Designation" onChange={handleInput} name='designation' value={values?.designation}/>
                        </div>
                    </div>
                <div className="addArticle_inputWrapperFull">
                    <div>
                        <label>Description</label>
                    </div>
                </div>
                <div className="addArticle_description">
                    <textarea placeholder="Description" onChange={handleInput} name='description' value={values?.description}> </textarea>
                </div>

                <div className="addArticle_button">
                    <button onClick={handleUpdate}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
