import React, { useState } from "react"
import { Container, Row, Col, Table } from "react-bootstrap";



export default function ImportCsvFile() {

    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);


    // convert from object data to array 
    var arrayData = csvArray.map(function (obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    });



    const processCsv = (str, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        const newArray = rows.map(x => {
            const values = x.split(delim);
            const eachObject = headers.reduce((obj, headers, i) => {
                obj[headers] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvArray(newArray)
    }

    const handleSubmit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            console.log(text)
            processCsv(text)
        }
        reader.readAsText(file)
    }

    // algorimta start 
    const result = arrayData.reduce((acc, el) => {
        let c = acc[el[1]];
        if (!c) {
            c = acc[el[1]] = {
                e1: 0,
                e2: 0,
                data: []
            };
        };

        c.data.forEach(d => {
            c.e1 = d[0];
            c.e2 = el[0];
        });

        c.data.push(el);
        return acc;

    }, {});

    const deObjectify = Object.entries(result).map(([projectId, { e1, e2 }]) => ({ e1, e2, projectId }));

    console.log(deObjectify.map(x=>x.e1),"12312312")


    console.log("inner workings");
    console.log(result.e1);

    // algoritam end 

    return (


        <Container style={{ display: "flex", justifyContent: "center" }}>
            <form id="csv-form" >


                <Row >
                    <Col>
                        <input className="choose-file"
                            type="file"
                            accept=".csv"
                            id='dataFile'
                            onChange={(e) => {
                                setCsvFile(e.target.files[0]);

                            }}
                            style={{ width: "100%" }}
                        >
                        </input>
                    </Col>
                </Row>


                <div>
                    <button className="choose-file" style={{ float: "right", marginBottom: "10px" }} onClick={(e) => {
                        e.preventDefault();
                        if (csvFile)
                            handleSubmit();
                    }}>
                        Submit
                    </button>
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>EmpID</th>
                                <th>ProjectID</th>
                                <th>DateFrom</th>
                                <th>DateTo</th>
                            </tr>
                        </thead>
                        {csvArray && csvArray.map((x, i) => <tbody key={i}>
                            <tr>
                                <td>{x.EmpID}</td>
                                <td>{x.ProjectID}</td>
                                <td>{x.DateFrom}</td>
                                <td>{x.DateTo}</td>
                            </tr>
                        </tbody>
                        )}
                    </Table>
                </div>
                <div>
                    <h1>The pair of employees who have worked together</h1>
                    <p><b>{deObjectify.map(x => x.e1)} | {deObjectify.map(x => x.e2)}</b></p>
                    <p></p>
                </div>
            </form>
        </Container>
    );


}