import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, Switch} from "@material-ui/core";

export default function Dish() {
    const [dishes, setDishes] = useState([]);
    const [dish, setDish] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);

    useEffect(() => {
        getDishes();
    }, [page, limit, total, search]);

    const getDishes = async () => {
        const {data: {dishes, total}} = await $crud.get('retrieve/chef/dishes', {
            search,
            page,
            limit
        });
        setDishes(dishes);
        setTotal(total);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setDish(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const save = async () => {
        try {
            await $crud.post(dish?.id ? "update/chef/dish" : "create/chef/dish", dish);
            setView(true);
            setDish([]);
        } finally {
            await getDishes();
        }
    }

    const edit = async (id) => {
        const {data: {dish}} = await $crud.get("retrieve/chef/dish-model", {id});
        setDish(dish);
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
            await $crud.post("delete/chef/dish", {id});
        } finally {
            await getDishes();
        }
    }
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>{!view ? 'Dish' : 'Dish List'}</h3>
                    </div>
                    <div className="col-sm-4">
                        <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <div className="col-sm-2">
                        <Button onClick={() => {
                            setDish([]);
                            setView(!view);
                        }} color="secondary" size="small" variant="contained">{view ?
                            <div><Add/> Add Dish</div> : <div><Visibility/> View List</div>}
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
                                    <th>Name</th>
                                    <th>About</th>
                                    <th>Price</th>
                                    <th>Ingredients</th>
                                    <th>Portion Size</th>
                                    <th>Preparation Time</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dishes?.map((item) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.about}</td>
                                        <td>{item.price}</td>
                                        <td>{item.ingredients}</td>
                                        <td>{item.portion_size}</td>
                                        <td>{item.preparation_time}</td>
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
                                {_.isEmpty(dishes) && <tr>
                                    <td colSpan={7} className="text-center">No records found*</td>
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
                                        value={dish?.name}
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
                                        value={dish?.image}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <Typography>About*</Typography>
                                    <TextField
                                        placeholder="Enter About"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="about"
                                        color="secondary"
                                        value={dish?.about}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-3">
                                    <Typography>Price*</Typography>
                                    <TextField
                                        placeholder="Enter Price"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="price"
                                        color="secondary"
                                        value={dish?.price}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Typography>Ingredients*</Typography>
                                    <TextField
                                        placeholder="Enter Ingredients"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="ingredients"
                                        color="secondary"
                                        value={dish?.ingredients}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Typography>Portion Size*</Typography>
                                    <TextField
                                        placeholder="Enter Portion Size"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="portion_size"
                                        color="secondary"
                                        value={dish?.portion_size}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Typography>Preparation Time*</Typography>
                                    <TextField
                                        placeholder="Enter Preparation Time"
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        name="preparation_time"
                                        color="secondary"
                                        value={dish?.preparation_time}
                                        onChange={e => valueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 d-flex justify-content-end">
                                <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                        onClick={() => {
                                            setDish([]);
                                            setView(true);
                                        }}>
                                    Cancel
                                </Button>
                                <Button size="small" color="secondary" variant="contained" onClick={() => save()}>
                                    {dish?.id ? "Update" : "Add"}
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