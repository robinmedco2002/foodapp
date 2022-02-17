import React, {useEffect, useState} from "react";
import {$crud} from "../../factories/CrudFactory";
import {Pagination} from "pagination-ui";
import _ from "lodash";
import {Add, Visibility, Edit, Delete} from "@material-ui/icons";
import {Button, IconButton, Typography, TextField, TextareaAutosize} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";

export default function AllUsers() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(true);
    const [type, setType] = useState("");

    useEffect(() => {
        getFeedbacks();
    }, [page, limit, total, search, type]);

    const getFeedbacks = async () => {
        const {data: {feedbacks, total}} = await $crud.get('retrieve/admin/feedbacks', {
            search,
            page,
            limit,
            type
        });
        setFeedbacks(feedbacks);
        setTotal(total);
    }

    const valueChange = (e) => {
        const {name, value} = e.target;
        setFeedback(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const edit = async (id) => {
        const {data: {feedback}} = await $crud.get("retrieve/admin/feedback-model", {id});
        setFeedback(feedback);
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
            await $crud.post("delete/admin/feedback", {id});
        } finally {
            await getFeedbacks();
        }
    }
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>{!view ? 'Feedback' : 'Feedback List'}</h3>
                    </div>
                    <div className="col-sm-2">
                        {
                            view &&
                            <TextField label="Type" select fullWidth size="small" color="secondary" variant="outlined"
                                       value={type}
                                       onChange={e => setType(e.target.value)}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="chef">Chefs</MenuItem>
                                <MenuItem value="delivery-user">Delivery Users</MenuItem>
                                <MenuItem value="customer">Customers</MenuItem>
                            </TextField>
                        }
                    </div>
                    <div className="col-sm-4">
                        {
                            view &&
                            <TextField fullWidth size="small" color="secondary" variant="outlined" placeholder="Search"
                                       value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                        }
                    </div>
                    <div className="col-sm-2">
                        {
                            !view && <Button onClick={() => {
                                setFeedback([]);
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
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Comment</th>
                                    <th>Send At</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {feedbacks?.map((item) => (
                                    <tr>
                                        <td>{item.type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.subject}</td>
                                        <td>{moment(item.createdAt).format("lll")}</td>
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
                                {_.isEmpty(feedbacks) && <tr>
                                    <td colSpan={6} className="text-center">No records found*</td>
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
                                    <RadioGroup style={{display: "block"}} name="type" value={feedback?.type}
                                    >
                                        <FormControlLabel disabled={!!feedback?.id && feedback?.type !== "chef"}
                                                          value="chef"
                                                          control={<Radio/>} label="Chef"/>
                                        <FormControlLabel
                                            disabled={!!feedback?.id && feedback?.type !== "delivery-user"}
                                            value="delivery-user" control={<Radio/>}
                                            label="Delivery User"/>
                                        <FormControlLabel disabled={!!feedback?.id && feedback?.type !== "customer"}
                                                          value="customer" control={<Radio/>}
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
                                        value={feedback?.name}
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
                                        value={feedback?.mobile}
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
                                        value={feedback?.email}
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
                                        value={feedback?.address}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-6">
                                    <Typography>Subject</Typography>
                                    <TextareaAutosize
                                        placeholder="Enter Subject"
                                        name="subject"
                                        minRows={6}
                                        style={{width: "100%", padding: "5px"}}
                                        value={feedback?.subject}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <Typography>Description*</Typography>
                                    <TextareaAutosize
                                        placeholder="Enter Description"
                                        name="description"
                                        minRows={6}
                                        style={{width: "100%", padding: "5px"}}
                                        value={feedback?.description}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 d-flex justify-content-end">
                                <Button className="mr-3" size="small" variant="outlined" color="secondary"
                                        onClick={() => {
                                            setFeedback([]);
                                            setView(true);
                                        }}>
                                    Cancel
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