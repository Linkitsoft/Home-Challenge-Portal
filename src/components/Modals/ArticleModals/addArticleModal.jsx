import React from "react";

const AddArticle = ({ setModal, handleAddArticle, setFormData, formData }) =>
{
    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }    

    return (
        <div className="addArticle">
            <div className="addArticle_inner">
                <div className="addArticle_topHead">
                    <p>Create Article</p>
                    <i onClick={() => setModal("")} className="cross fas fa-times"></i>
                </div>

                <div className="addArticle_wrapper">
                    <div className="addArticle_inputWrapper">
                        <div>
                            <label>ID</label>
                            <input onChange={handleInput} name='id' type="text" placeholder="Enter unique id" />
                        </div>

                        <div>
                            <label>Date</label>
                            <input type="date" onChange={handleInput} name='date'/>
                        </div>
                    </div>

                    <div className="addArticle_inputWrapper">
                        <div>
                            <label>Title</label>
                            <input type="text" placeholder="Enter Title" onChange={handleInput} name='title' />
                        </div>

                        <div>
                            <label>Author</label>
                            <input type="text" placeholder="Author" onChange={handleInput} name='author' />
                        </div>
                    </div>
                    <div className="addArticle_inputWrapperFull">
                        <div>
                            <label>Designation</label>
                            <input type="text" placeholder="Enter Designation" onChange={handleInput} name='designation' />
                        </div>
                    </div>
                </div>

                <div className="addArticle_inputWrapperFull">
                    <div>
                        <label>Description</label>
                    </div>
                </div>
                <div className="addArticle_description">
                    <textarea placeholder="Description" onChange={handleInput} name='description'> </textarea>
                </div>

                <div className="addArticle_button">
                    <button onClick={() => { handleAddArticle()}}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AddArticle;
