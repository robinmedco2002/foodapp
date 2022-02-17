import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, Switch} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);
    const [role, setRole] = useState("");

    useEffect(() => {
        getUsers();
    }, [page, limit, total, search, role]);

    const getUsers = async () => {
        const {data: {users, total}} = await $crud.get('retrieve/admin/users', {
            search,
            page,
            limit,
            role
        });
        setUsers(users);
        setTotal(total);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const save = async () => {
        try {
            if (!user?.type) {
                await $crud.notify({
                    type: "error",
                    message: "Please select the User Type"
                });
            } else {
                if (user?.type === "chef") {
                    await $crud.post(user?.id ? "update/admin/chef" : "create/chef", user);
                } else if (user?.type === "delivery-user") {
                    await $crud.post(user?.id ? "update/admin/delivery-user" : "create/delivery-user", user);
                } else if (user?.type === "user") {
                    await $crud.post(user?.id ? "update/admin/user" : "create/user", user);
                }
                setView(true);
                setUser([]);
                await getUsers();
            }
        } finally {
            await getUsers();
        }
    }

    const edit = async (id) => {
        const {data: {user}} = await $crud.get("retrieve/admin/user-model", {id});
        Object.assign(user, {type: user?.role.slug});
        console.log(user);
        setUser(user);
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
            await $crud.post("delete/admin/user", {id});
        } finally {
            await getUsers();
        }
    }
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>{!view ? 'User' : 'Users List'}</h3>
                    </div>
                    <div className="col-sm-2">
                        {
                            view &&
                            <TextField label="Type" select fullWidth size="small" color="secondary"
                                       variant="outlined"
                                       placeholder="Search"
                                       value={role}
                                       onChange={e => setRole(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value={2}>Chefs</MenuItem>
                                <MenuItem value={3}>Delivery Users</MenuItem>
                                <MenuItem value={4}>Customers</MenuItem>
                            </TextField>
                        }
                    </div>
                    <div className="col-sm-4">
                        {
                            view &&
                            <TextField fullWidth size="small" color="secondary" variant="outlined"
                                       placeholder="Search"
                                       value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                        }
                    </div>
                    <div className="col-sm-2">
                        <Button onClick={() => {
                            setUser([]);
                            setView(!view);
                        }} color="secondary" size="small" variant="contained">{view ?
                            <div><Add/> Add User</div> : <div><Visibility/> View List</div>}
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
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Zip Code</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users?.map((item) => (
                                    <tr>
                                        <td>{item.role?.name}</td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>
                                        <td>{item.zip_code}</td>
                                        <td>{item.state}</td>
                                        <td>{item.city}</td>
                                        <td>{item.address}</td>
                                        <td>{item.is_active ? "Active" : "In Active"}</td>
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
                                            <Switch
                                                size="small"
                                                checked={item.is_active}
                                                onChange={async () => {
                                                    await $crud.post("update/admin/user-status", {
                                                        id: item.id,
                                                        status: !item.is_active
                                                    });
                                                    await getUsers();
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {_.isEmpty(users) && <tr>
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
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Typography>Type*</Typography>
                                        <RadioGroup style={{display: "block"}} name="type" value={user?.type}
                                                    onChange={valueChange}>
                                            <FormControlLabel disabled={!!user?.id && user?.role.slug !== "chef"}
                                                              value="chef"
                                                              control={<Radio/>} label="Chef"/>
                                            <FormControlLabel
                                                disabled={!!user?.id && user?.role.slug !== "delivery-user"}
                                                value="delivery-user" control={<Radio/>}
                                                label="Delivery User"/>
                                            <FormControlLabel disabled={!!user?.id && user?.role.slug !== "user"}
                                                              value="user" control={<Radio/>}
                                                              label="Customer"/>
                                        </RadioGroup>
                                    </div>
                                </div>
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
                                            value={user?.name}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Typography>Mobile*</Typography>
                                        <TextField
                                            placeholder="Enter Mobile"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="mobile"
                                            color="secondary"
                                            value={user?.mobile}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Typography>Email*</Typography>
                                        <TextField
                                            placeholder="Enter Email"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="email"
                                            color="secondary"
                                            value={user?.email}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-4">
                                        <Typography>Zip Code*</Typography>
                                        <TextField
                                            placeholder="Enter ZipCode"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="zip_code"
                                            color="secondary"
                                            value={user?.zip_code}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Typography>State*</Typography>
                                        <TextField
                                            placeholder="Enter State"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="state"
                                            color="secondary"
                                            value={user?.state}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Typography>City*</Typography>
                                        <TextField
                                            placeholder="Enter City"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="city"
                                            color="secondary"
                                            value={user?.city}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        <Typography>Address*</Typography>
                                        <TextField
                                            placeholder="Enter Address"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            name="address"
                                            color="secondary"
                                            value={user?.address}
                                            onChange={e => valueChange(e)}
                                        />
                                    </div>
                                </div>
                                {
                                    user?.type !== "delivery-user"
                                    &&
                                    <div className="row mt-4">
                                        <div className="col-sm-6">
                                            <Typography>Password*</Typography>
                                            <TextField
                                                placeholder="Enter Password"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                name="password"
                                                color="secondary"
                                                value={user?.password}
                                                onChange={e => valueChange(e)}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <Typography>Confirm Password*</Typography>
                                            <TextField
                                                placeholder="Enter Confirm Password"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                name="confirm_password"
                                                color="secondary"
                                                value={user?.confirm_password}
                                                onChange={e => valueChange(e)}
                                            />
                                        </div>
                                    </div>
                                }
                                <div className="mt-5 d-flex justify-content-end">
                                    <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                            onClick={() => {
                                                setUser([]);
                                                setView(true);
                                            }}>
                                        Cancel
                                    </Button>
                                    <Button size="small" color="secondary" variant="contained" onClick={() => save()}>
                                        {user?.id ? "Update" : "Add"}
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