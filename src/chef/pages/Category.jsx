import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, Switch} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

export default function AllUsers() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);
    const [type, setType] = useState("");

    useEffect(() => {
        getCategories();
    }, [page, limit, total, search, type]);

    const getCategories = async () => {
        const {data: {categories, total}} = await $crud.get('retrieve/categories', {
            search,
            page,
            limit,
            type,
            options: true
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

    const save = async () => {
        Object.assign(category, {type: "sub-category"});
        try {
            await $crud.post(category?.id ? "update/category" : "create/category", category);
            setView(true);
            setCategory([]);
            await getCategories();
        } finally {
            await getCategories();
        }
    }

    const edit = async (id) => {
        const {data: {category}} = await $crud.get("retrieve/category-model", {id});
        setCategory(category);
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
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>{!view ? 'Sub Category' : 'Sub Category List'}</h3>
                    </div>
                    <div className="col-sm-4">
                        <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <div className="col-sm-2">
                        <Button onClick={() => {
                            setCategory([]);
                            setView(!view);
                        }} color="secondary" size="small" variant="contained">{view ?
                            <div><Add/> Add Category</div> : <div><Visibility/> View List</div>}
                        </Button>
                    </div>
                </div>
                {
                    view &&
                    <div className="mt-5">
                        <div className="table table-hover">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories?.map((item) => (
                                    <tr>
                                        <td>#</td>
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
                                    <td colSpan={2} className="text-center">No records found*</td>
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
                                    <div className="col-sm-4">
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
                                <div className="mt-5 d-flex justify-content-end">
                                    <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                            onClick={() => {
                                                setCategory([]);
                                                setView(true);
                                            }}>
                                        Cancel
                                    </Button>
                                    <Button size="small" color="secondary" variant="contained" onClick={() => save()}>
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