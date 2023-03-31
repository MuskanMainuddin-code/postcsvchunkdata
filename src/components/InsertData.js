import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
// import records from "./records";
import _ from "lodash";
import Papa from "papaparse";

const InsertData = () => {
  var data = [];
  const [all_records, setall_records] = useState([])
  const [refresh, setrefresh] = useState(false)
  const [fetchloader, setfetchloader] = useState(false)
  const [insertloader, setinsertloader] = useState(false)
  const [CSVData, setCSVData] = useState();

  var commonConfig = { delimiter: "," };

  useEffect(() => {
    const fetchData = async () => {
      setfetchloader(true)
      await axios.get("http://fa.dglabsdev.com:8080/api/test_tasks/fetch")
      .then(async (res) => {
        console.log("fetched records")
        console.log(res)
        setall_records(res.data)
        await setfetchloader(false)
      })
      .catch((error) => console.log(error))
    }
    fetchData()
  },[refresh])

  const fetchCsv = async (e) => {
    var file = e.target.files[0] || e.dataTransfer.files[0]

    /*use Papa.parse to convert csv file to json obj*/
    Papa.parse(
      file,
      {
        ...commonConfig,
        header: true,
        complete: (result) => {
          setCSVData(result.data);
          alert("Your csv file is converted to json, check console")
          console.log("csv to json")
          console.log(result.data)
        }
      }
    );
  }

  const jsonsample = CSVData

  const PostData = async () => {

    /*break array into set of 1000*/
    const chunks = _.chunk(jsonsample, 1000)
    console.log("chunks")
    console.log(chunks)

    /*loop through the chunks and send single set as a req to an API*/
    var count = 1
    setinsertloader(true)
    for(const c of chunks) {
      await axios.post("http://fa.dglabsdev.com:8080/api/test_tasks/insert", c)
      alert(`Chunk ${count} posted`)
      count ++
    }
    setrefresh(true)
    setinsertloader(false)
  }

  const arr = [
    {
      "_id": "1",
      "data": [
        {
          "Sequence": "2023 Beginning of the Year Sales Sequence (Targeted)",
          "Step": 3,
          "Template": "a",
          "From Email": "wood.a@mfgfactur.com",
          "To Email": "kevin.moran@phenixflooring.com",
          "From Name": "Adam Wood",
          "To Name": "Kevin Moran",
          "Subject": "Re: 2023 Sales Goals // Business Development for Phenix Flooring",
          "Body HTML": "<html><head></head><body><div><apdynamicvar data-dynamic-variable-key='first_name'>Kevin</apdynamicvar>,</div><div><br></div><div>Just to further elaborate on how our service works.</div><div><br></div><ol><li>We can provide better leads for your sales team or leadership so they can focus more on closing deals rather than prospecting.</li><li>We can tee up qualified sales conversations for you or your sales leaders so you can take advantage of the the precious time allocated towards sales.</li></ol><div>Would you be open to a conversation over the next few business days?</div></body></html><br/><div>Adam Wood</div><div>&nbsp;</div><div>Business Development, Factur</div><div>&nbsp;</div><div><img src=\"https://lh4.googleusercontent.com/EUGcnxIupsfDijF8DUwqGnBMGt9APuKSz4d5H269EVPXa4uQbtZB6cJApAemNSJU_JSsLytDVeZfmwiTjgyY3F0mFB2Jhyaq3G8fOjbBdVfFgB3pRxkAy5A7thls15t-dbbI9UVB\" style=\"max-width: 100%\" alt=\"Logo\" width=\"107\"></div><div>t: 317-622-8970</div><div>e: wood.a@mfgfactur.com</div><div>w: <a href=\"https://repo.mfgfactur.com/red.php?red=w9qfxkbgh1y\" rel=\"noopener noreferrer\" target=\"_blank\">mfgfactur.com</a></div>",
          "Sent At (PST)": "",
          "Scheduled At (PST)": "March 06, 2023 04:03",
          "CC": "",
          "BCC": "",
          "Sent": false,
          "Bounce": false,
          "Open": false,
          "Click": false,
          "Unsubscribe": false,
          "Replied": false,
          "Reply Message": "",
          "Contact Stage": "No Activity",
          "To Company": "Phenix Flooring"
        },
        {
          "Sequence": "2023 Beginning of the Year Sales Sequence (Targeted)",
          "Step": 3,
          "Template": "a",
          "From Email": "aw@be-thefactur.com",
          "To Email": "dmichalak@3m.com",
          "From Name": "Adam Wood",
          "To Name": "Dan Michalak",
          "Subject": "Re: 2023 Sales Goals // Business Development for Acelity",
          "Body HTML": "<html><head></head><body><div><apdynamicvar data-dynamic-variable-key='first_name'>Dan</apdynamicvar>,</div><div><br></div><div>Just to further elaborate on how our service works.</div><div><br></div><ol><li>We can provide better leads for your sales team or leadership so they can focus more on closing deals rather than prospecting.</li><li>We can tee up qualified sales conversations for you or your sales leaders so you can take advantage of the the precious time allocated towards sales.</li></ol><div>Would you be open to a conversation over the next few business days?</div></body></html><br/><div>Adam Wood</div><div><br></div><div>Business Development</div><div>&nbsp;</div><div><img src=\"https://lh4.googleusercontent.com/EUGcnxIupsfDijF8DUwqGnBMGt9APuKSz4d5H269EVPXa4uQbtZB6cJApAemNSJU_JSsLytDVeZfmwiTjgyY3F0mFB2Jhyaq3G8fOjbBdVfFgB3pRxkAy5A7thls15t-dbbI9UVB\" style=\"max-width: 100%\" alt=\"Logo\" width=\"107\"></div><div>t: 317-622-8970</div><div>e: <span style=\"color: rgba(0, 0, 0, 0.87);\">AW@be-thefactur.com</span></div><div>w: <a href=\"https://repo.be-thefactur.com/red.php?red=4kvss3ckq5p\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(17, 85, 204);\">be-thefactur.com</a></div>",
          "Sent At (PST)": "",
          "Scheduled At (PST)": "March 06, 2023 04:01",
          "CC": "",
          "BCC": "",
          "Sent": false,
          "Bounce": false,
          "Open": false,
          "Click": false,
          "Unsubscribe": false,
          "Replied": false,
          "Reply Message": "",
          "Contact Stage": "No Activity",
          "To Company": "Acelity"
        }
      ],
      "createdAt": "2023-03-30T11:08:58.292Z",
      "updatedAt": "2023-03-30T11:08:58.292Z",
      "__v": 0
    },
    {
      "_id": "2",
      "data": [
        {
          "Sequence": "2023 Beginning of the Year Sales Sequence (Targeted)",
          "Step": 3,
          "Template": "a",
          "From Email": "wood.a@mfgfactur.com",
          "To Email": "kevin.moran@phenixflooring.com",
          "From Name": "Adam Wood",
          "To Name": "Kevin Moran",
          "Subject": "Re: 2023 Sales Goals // Business Development for Phenix Flooring",
          "Body HTML": "<html><head></head><body><div><apdynamicvar data-dynamic-variable-key='first_name'>Kevin</apdynamicvar>,</div><div><br></div><div>Just to further elaborate on how our service works.</div><div><br></div><ol><li>We can provide better leads for your sales team or leadership so they can focus more on closing deals rather than prospecting.</li><li>We can tee up qualified sales conversations for you or your sales leaders so you can take advantage of the the precious time allocated towards sales.</li></ol><div>Would you be open to a conversation over the next few business days?</div></body></html><br/><div>Adam Wood</div><div>&nbsp;</div><div>Business Development, Factur</div><div>&nbsp;</div><div><img src=\"https://lh4.googleusercontent.com/EUGcnxIupsfDijF8DUwqGnBMGt9APuKSz4d5H269EVPXa4uQbtZB6cJApAemNSJU_JSsLytDVeZfmwiTjgyY3F0mFB2Jhyaq3G8fOjbBdVfFgB3pRxkAy5A7thls15t-dbbI9UVB\" style=\"max-width: 100%\" alt=\"Logo\" width=\"107\"></div><div>t: 317-622-8970</div><div>e: wood.a@mfgfactur.com</div><div>w: <a href=\"https://repo.mfgfactur.com/red.php?red=w9qfxkbgh1y\" rel=\"noopener noreferrer\" target=\"_blank\">mfgfactur.com</a></div>",
          "Sent At (PST)": "",
          "Scheduled At (PST)": "March 06, 2023 04:03",
          "CC": "",
          "BCC": "",
          "Sent": false,
          "Bounce": false,
          "Open": false,
          "Click": false,
          "Unsubscribe": false,
          "Replied": false,
          "Reply Message": "",
          "Contact Stage": "No Activity",
          "To Company": "Phenix Flooring"
        },
        {
          "Sequence": "2023 Beginning of the Year Sales Sequence (Targeted)",
          "Step": 3,
          "Template": "a",
          "From Email": "aw@be-thefactur.com",
          "To Email": "dmichalak@3m.com",
          "From Name": "Adam Wood",
          "To Name": "Dan Michalak",
          "Subject": "Re: 2023 Sales Goals // Business Development for Acelity",
          "Body HTML": "<html><head></head><body><div><apdynamicvar data-dynamic-variable-key='first_name'>Dan</apdynamicvar>,</div><div><br></div><div>Just to further elaborate on how our service works.</div><div><br></div><ol><li>We can provide better leads for your sales team or leadership so they can focus more on closing deals rather than prospecting.</li><li>We can tee up qualified sales conversations for you or your sales leaders so you can take advantage of the the precious time allocated towards sales.</li></ol><div>Would you be open to a conversation over the next few business days?</div></body></html><br/><div>Adam Wood</div><div><br></div><div>Business Development</div><div>&nbsp;</div><div><img src=\"https://lh4.googleusercontent.com/EUGcnxIupsfDijF8DUwqGnBMGt9APuKSz4d5H269EVPXa4uQbtZB6cJApAemNSJU_JSsLytDVeZfmwiTjgyY3F0mFB2Jhyaq3G8fOjbBdVfFgB3pRxkAy5A7thls15t-dbbI9UVB\" style=\"max-width: 100%\" alt=\"Logo\" width=\"107\"></div><div>t: 317-622-8970</div><div>e: <span style=\"color: rgba(0, 0, 0, 0.87);\">AW@be-thefactur.com</span></div><div>w: <a href=\"https://repo.be-thefactur.com/red.php?red=4kvss3ckq5p\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(17, 85, 204);\">be-thefactur.com</a></div>",
          "Sent At (PST)": "",
          "Scheduled At (PST)": "March 06, 2023 04:01",
          "CC": "",
          "BCC": "",
          "Sent": false,
          "Bounce": false,
          "Open": false,
          "Click": false,
          "Unsubscribe": false,
          "Replied": false,
          "Reply Message": "",
          "Contact Stage": "No Activity",
          "To Company": "Acelity"
        }
      ],
      "createdAt": "2023-03-30T11:08:58.292Z",
      "updatedAt": "2023-03-30T11:08:58.292Z",
      "__v": 0
    }
  ]

  const columns = [
    {
      name: 'Sr no.',
      selector: 'no',
      sortable: true,
    },
    {
      name: 'id',
      selector: '_id',
      sortable: true,
    },
    {
      name: 'createdAt',
      selector: 'createdAt',
      sortable: true,
    },
    {
      name: 'updatedAt',
      selector: 'updatedAt',
      sortable: true,
    },
  ];

    const tableData = {
        columns,
        data,
      };

    // const meta = {
    //     title: 'Some Meta Title',
    //     description: 'I am a description, and I can create multiple tags',
    //     canonical: 'http://example.com/path/to/page',
    //     meta: {
    //         charset: 'utf-8',
    //         name: {
    //             keywords: 'react,meta,document,html,tags'
    //         }
    //     }
      }
        

  return (
    <>
    {/*<DocumentMeta {...meta} />*/}
    <div style={{"textAlign":"center"}}>
      <h3>1. Choose csv to post it as json</h3>
      <input type="file" id="file" onChange={(e) => fetchCsv(e)}/>
      <button
      className="submit_btn"
      onClick={PostData}
      >
      2. Submit Request in Chunks
      </button>
      <h3 className={insertloader == false ? "hide" : ""}>{"loading..."}</h3>
      <div>
      {
        all_records.map((obj, index) => {
          var datalist = {
            "no":index+1,
            "_id":obj._id,
            "createdAt":obj.createdAt,
            "updatedAt":obj.updatedAt,

          }
          data.push(datalist)
          data.sort(function(a, b){return b.no - a.no});

        })
      }
        <DataTableExtensions
          columns={columns}
          data={data}
          filter={false}
          export={false}
          print={false}
        >
          <DataTable
            noHeader
            pagination
            highlightOnHover
            progressPending={fetchloader}
          />
        </DataTableExtensions>
      </div>
    </div>
    </>
  );
}

export default InsertData