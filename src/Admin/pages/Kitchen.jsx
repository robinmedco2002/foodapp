import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, TextareaAutosize} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {APP_URL} from "../../constants";

export default function Kitchens() {
    const [kitchens, setKitchens] = useState([]);
    const [kitchen, setKitchen] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        getKitchens();
    }, [page, limit, total, search]);

    useEffect(() => {
        getSubCategory();
    }, []);


    const getKitchens = async () => {
        const {data: {kitchens, total}} = await $crud.get('retrieve/chef/kitchens', {
            search,
            page,
            limit
        });
        setKitchens(kitchens);
        setTotal(total);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setKitchen(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const save = async () => {
        let formData = new FormData();
        if (kitchen?.id) {
            formData.append("id", kitchen?.id);
        }
        formData.append("name", kitchen?.name);
        if (!kitchen?.id) {
            formData.append("image", kitchen?.image);
        }
        formData.append("sub_category_id", kitchen?.sub_category_id);
        formData.append("status", kitchen?.status);
        formData.append("delivery_option", kitchen?.delivery_option);
        formData.append("open_time", kitchen?.oprn_time);
        formData.append("close_time", kitchen?.close_time);
        formData.append("address", kitchen?.address);
        formData.append("zip_code", kitchen?.zip_code);
        formData.append("about", kitchen?.about);

        try {
            await $crud.post(kitchen?.id ? "update/chef/kitchen" : "create/chef/kitchen", formData);
            setView(true);
            setKitchen([]);
        } finally {
            await getKitchens();
        }
    }

    const edit = async (id) => {
        const {data: {kitchen}} = await $crud.get("retrieve/chef/kitchen-model", {id});
        setKitchen(kitchen);
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
            await $crud.post("delete/chef/kitchen", {id});
        } finally {
            await getKitchens();
        }
    }

    const getSubCategory = async () => {
        const {data: {categories}} = await $crud.get("retrieve/categories", {options: true});
        setSubCategory(categories);
    }

    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>{!view ? 'Kitchen' : 'Kitchen List'}</h3>
                    </div>
                    <div className="col-sm-4">
                        <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <div className="col-sm-2">
                        {
                            !view &&
                            <Button onClick={() => {
                                setKitchen([]);
                                setView(!view);
                            }} color="secondary" size="small" variant="contained">
                                <div><Visibility/> View List</div>
                            </Button>
                        }
                    </div>
                </div>
                {
                    view &&
                    <div className="mt-5">
                        <div className="table table-hover">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Kitchen Name</th>
                                    <th>Chef Name</th>
                                    <th>Image</th>
                                    <th>Kitchen Time</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Delivery Option</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {kitchens?.map((item) => (
                                    <tr>
                                        <td>{item?.name}</td>
                                        <td>{item?.chef?.name}</td>
                                        <td><img alt="image" src={APP_URL + item.image} width="50px"
                                                 height="50px"/></td>
                                        <td>{item.open_time} - {item.close_time}</td>
                                        <td>{item.address}</td>
                                        <td>{item.status}</td>
                                        <td>{item.delivery_option}</td>
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
                                {_.isEmpty(kitchens) && <tr>
                                    <td colSpan={10} className="text-center">No records found*</td>
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
                                        value={kitchen?.name}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Typography>Image*</Typography>
                                    <TextField
                                        type="file"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="image"
                                        color="secondary"
                                        // value={kitchen?.image}
                                        onChange={e => setKitchen(prev => ({
                                            ...prev,
                                            image: e.target.files[0]
                                        }))}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Typography>Sub Category*</Typography>
                                    <TextField
                                        select
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="sub_category_id"
                                        color="secondary"
                                        value={kitchen?.sub_category_id}
                                        onChange={e => valueChange(e)}
                                    >
                                        {
                                            subCategory?.map(({id, name}) => (
                                                <MenuItem value={id}>{name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-3">
                                    <Typography>Kitchen Status*</Typography>
                                    <TextField
                                        select
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="status"
                                        color="secondary"
                                        value={kitchen?.status}
                                        onChange={e => valueChange(e)}
                                    >
                                        <MenuItem value="open">Open</MenuItem>
                                        <MenuItem value="close">Close</MenuItem>
                                        <MenuItem value="busy">Busy</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <Typography>Delivery Option*</Typography>
                                    <TextField
                                        select
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="delivery_option"
                                        color="secondary"
                                        value={kitchen?.delivery_option}
                                        onChange={e => valueChange(e)}
                                    >
                                        <MenuItem value="takeaway">Takeaway</MenuItem>
                                        <MenuItem value="delivery">Delivery</MenuItem>
                                        <MenuItem value="both">Both</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <Typography>Open Time*</Typography>
                                    <TextField
                                        type="time"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="open_time"
                                        color="secondary"
                                        value={kitchen?.open_time}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Typography>Close Time*</Typography>
                                    <TextField
                                        type="time"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="close_time"
                                        color="secondary"
                                        value={kitchen?.close_time}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-9">
                                    <Typography>Address*</Typography>
                                    <TextField
                                        placeholder="Enter Address"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="address"
                                        color="secondary"
                                        value={kitchen?.address}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Typography>Zip Code</Typography>
                                    <TextField
                                        placeholder="Enter Zip Code"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="zip_code"
                                        color="secondary"
                                        value={kitchen?.zip_code}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <TextareaAutosize
                                    placeholder="Enter About"
                                    name="about"
                                    minRows={6}
                                    style={{width: "100%", padding: "5px"}}
                                    value={kitchen?.about}
                                    onChange={(e) => valueChange(e)}
                                />
                            </div>
                            <div className="mt-5 d-flex justify-content-end">
                                <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                        onClick={() => {
                                            setKitchen([]);
                                            setView(true);
                                        }}>
                                    Cancel
                                </Button>
                                <Button size="small" color="secondary" variant="contained" onClick={() => save()}>
                                    {kitchen?.id ? "Update" : "Add"}
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