import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, MenuItem} from "@material-ui/core";
import {APP_URL} from "../../constants";

export default function AllUsers() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);
    const [type, setType] = useState("");
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState({});

    useEffect(() => {
        getCategories();
    }, [page, limit, total, search, type]);

    const getCategories = async () => {
        const {data: {categories, total}} = await $crud.get('retrieve/categories', {
            search,
            page,
            limit,
            type
        });
        setCategories(categories);
        setTotal(total);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const fileChange = (e) => {
        const {name} = e.target;
        setImages(prev => ({
            ...prev,
            [name]: URL.createObjectURL(e.target.files[0])
        }));

        setCategory(prev => ({
            ...prev,
            [name]: e.target.files[0]
        }));
    }

    const save = async () => {
        const formData = new FormData();
        formData.append("image", category?.image || "");
        formData.append("mouse_over_image", category?.mouse_over_image || "");
        formData.append("name", category?.name || "");
        formData.append("type", category?.type || "");
        if (category?.id)
            formData.append("id", category?.id);
        try {
            setSaving(true);
            await $crud.post(category?.id ? "update/category" : "create/category", formData);
            await getCategories();
            cancel();
        } catch (e) {
            console.log(e);
        } finally {
            setSaving(false);
        }
    }

    const edit = async (id) => {
        const {data: {category}} = await $crud.get("retrieve/category-model", {id});
        setCategory(prev => ({
            ...prev,
            id: category.id,
            name: category.name,
            type: category.type
        }));
        const image = APP_URL + category?.image;
        const mouse_over_image = APP_URL + category?.mouse_over_image;
        setImages(prev => ({
            ...prev,
            image,
            mouse_over_image
        }))
    }

    const deleteOrder = async (id) => {
        try {
            await $crud.confirm({
                title: "Are you sure?",
                textContent: "Do you want to delete this record?",
                options: {
                    ok: "Yes",
                    cancel: "No"
                }
            });
            await $crud.post("delete/category", {id});
        } finally {
            await getCategories();
        }
    }

    const cancel = () => {
        setCategory([]);
        setView(true);
        setImages({});
    }

    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-4 mt-3">
                        <h3>{!view ? 'Category' : 'Category List'}</h3>
                    </div>
                    <div className="col-sm-2 mt-3">
                        {
                            view &&
                            <TextField label="Type" select fullWidth size="small" color="secondary" variant="outlined"
                                       value={type}
                                       onChange={e => setType(e.target.value)}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="main-category">Main Category</MenuItem>
                                <MenuItem value="sub-category">Sub Category</MenuItem>
                            </TextField>
                        }
                    </div>
                    <div className="col-sm-4 mt-3">
                        {
                            view &&
                            <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                       value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                        }
                    </div>
                    <div className="col-sm-2 mt-3">
                        <Button onClick={() => {
                            setCategory([]);
                            setImages({});
                            setView(!view);
                        }} color="secondary" size="small" variant="contained">{view ?
                            <div><Add/> Add Category</div> : <div><Visibility/> View List</div>}
                        </Button>
                    </div>
                </div>
                {
                    view &&
                    <div className="mt-5">
                        <div>
                            <table className="table table-hover table-responsive-sm">
                                <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories?.map((item) => (
                                    <tr>
                                        <td>{item.type}</td>
                                        <td>{item.type === "main-category" &&
                                            <img src={APP_URL + item?.image} width="50px" height="50px"/>}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <IconButton size="small" onClick={async () => {
                                                await edit(item.id);
                                                setView(false);
                                            }}
                                            >
                                                <Edit color="secondary"/>
                                            </IconButton>
                                            <IconButton size="small" onClick={async () => {
                                                await deleteOrder(item.id);
                                            }}>
                                                <Delete color="secondary"/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                                {_.isEmpty(categories) && <tr>
                                    <td colSpan={3} className="text-center">No records found*</td>
                                </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {!view &&
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            <div className="contact-form">
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <Typography>Type*</Typography>
                                        <TextField
                                            select
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="type"
                                            color="secondary"
                                            value={category?.type}
                                            onChange={e => valueChange(e)}
                                        >
                                            <MenuItem value="main-category">Main Category</MenuItem>
                                            <MenuItem value="sub-category">Sub Category</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col-md-6">
                                        <Typography>Name*</Typography>
                                        <TextField
                                            placeholder="Enter Name"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="name"
                                            color="secondary"
                                            value={category?.name}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                </div>
                                {
                                    category?.type === "main-category" &&
                                    <>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <Typography>Image*</Typography>
                                                <TextField
                                                    type="file"
                                                    size="small"
                                                    fullWidth
                                                    variant="outlined"
                                                    name="image"
                                                    color="secondary"
                                                    onChange={fileChange}
                                                />
                                                {
                                                    !!images?.image &&
                                                    <div className="mt-5">
                                                        <img src={images?.image} width="150px" height="150px"/>
                                                    </div>
                                                }
                                            </div>

                                            <div className="col-md-6">
                                                <Typography>Mouse Over Image*</Typography>
                                                <TextField
                                                    type="file"
                                                    size="small"
                                                    fullWidth
                                                    variant="outlined"
                                                    name="mouse_over_image"
                                                    color="secondary"
                                                    onChange={fileChange}
                                                />
                                                {
                                                    !!images?.mouse_over_image &&
                                                    <div className="mt-5">
                                                        <img src={images?.mouse_over_image} width="150px"
                                                             height="150px"/>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="mt-5 d-flex justify-content-end">
                                    <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                            onClick={cancel}>
                                        Cancel
                                    </Button>
                                    <Button disabled={saving} size="small" color="secondary" variant="contained"
                                            onClick={() => save()}>
                                        {category?.id ? "Update" : "Add"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    view &&
                    <div className="border-top">
                        <Pagination total={total} limit={limit} page={page} limitRange onLimitChange={setLimit}
                                    onPageChange={setPage}/>
                    </div>
                }
            </section>
        </>
    );
}