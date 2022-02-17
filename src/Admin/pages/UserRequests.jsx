import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Button, TextField} from "@material-ui/core";
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
            role,
            type: "pending"
        });
        setUsers(users);
        setTotal(total);
    }

    const status = async (id, value) => {
        try {
            await $crud.confirm({
                title: "Are you sure?",
                textContent: `Do you want to ${value} this record?`,
                options: {
                    ok: "Yes",
                    cancel: "No"
                }
            });
            await $crud.post("update/admin/user-approve-status", {id, type: value});
        } finally {
            await getUsers();
        }
    }
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>{!view ? 'User' : 'Users List'}</h3>
                    </div>
                    <div className="col-sm-2">
                        <TextField label="Type" select fullWidth size="small" color="secondary" variant="outlined"
                                   placeholder="Search"
                                   value={role}
                                   onChange={e => setRole(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={2}>Chefs</MenuItem>
                            <MenuItem value={3}>Delivery Users</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-sm-4">
                        <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}/>
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
                                        <td>
                                            <Button size="small" variant="contained" color="default"
                                                    onClick={async () => {
                                                        await status(item.id, "reject");
                                                    }}
                                            >
                                                Reject
                                            </Button>
                                            <Button className="ml-2" size="small" variant="contained" color="secondary"
                                                    onClick={async () => {
                                                        await status(item.id, "approve");
                                                    }}>
                                                Approve
                                            </Button>
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