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
  const [CSVData, setCSVData] = useState([]);

  var commonConfig = { delimiter: "," };
  var effectCount = 0
  useEffect(() => {
    if(effectCount == 0){
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
    }
    effectCount += 1
  },[refresh])

  const fetchCsv = async (e) => {
    var file = e.target.files[0] || e.dataTransfer.files[0]

    /*use Papa.parse to convert csv file to json obj*/
    document.getElementById("conversion").innerHTML = "..."
    Papa.parse(
      file,
      {
        ...commonConfig,
        header: true,
        complete: (result) => {
          setCSVData(result.data);
          console.log("csv to json")
          console.log(result.data)
          document.getElementById("conversion").innerHTML = "Your csv file is converted to json, check console."
        }
      }
    );
  }

  const PostData = async () => {

    if(CSVData.length != 0){
      /*break array into chunks of 1000 records each*/

      /*using loadash*/
      const chunks = _.chunk(CSVData, 1000)

      /*using for loop*/
      /*const chunkSize = 1000;
      var chunks = []
      for (let i = 0; i < CSVData.length; i += chunkSize) {
          const chunk = CSVData.slice(i, i + chunkSize);
          chunks.push(chunk)
      }*/

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
    else{
      alert("Please choose csv file!")
    }

  }

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

  return (
    <>
    {/*<DocumentMeta {...meta} />*/}
    <div style={{"textAlign":"center"}}>
      <h3>1. Choose csv to post it as json</h3>
      <input type="file" id="file" onChange={(e) => fetchCsv(e)}/>
      <p id="conversion"></p>
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