import { Table, Space, Button,  } from "antd";
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PatientForm from "../Form";
import { authDelete, authGet } from "../../../utils/requiest";
import { patientapi, patientdeleteapi } from "../../../utils/api";
import moment from "moment";

const Title = ({ onAddRegion }) => {
  return (
    <div className="patient_header">
      <h3>Patients</h3>
      <Button
        type="primary"
        onClick={onAddRegion}
        id="addRegion"
        size={"large"}
      >
        Add Region
      </Button>
    </div>
  );
};
const onDelete = async(slug) => {
  await authDelete(patientdeleteapi(slug))
}

const ActionColumn = ({ slug, setIsModel, setPatientId }) => {
  return (
    <Space size="middle">
      <EditTwoTone
        className="edit_icon"
        onClick={() => {
          setIsModel(true);
          setPatientId(slug);
        }}
      />
<DeleteOutlined className="edit_icon" onClick={onDelete(slug)}/>
    </Space>
  );
};

const Patients = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [isModel, setIsModel] = useState(false);
  const [patientData, setPatientData] = useState();
  const [patientId, setPatientId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const patient = await authGet(patientapi);
      setPatientData(patient?.data?.data);
    };

    // call the function
    fetchData();
  }, []);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <ActionColumn
          slug={record.key}
          setIsModel={setIsModel}
          setPatientId={(val) => setPatientId(val)}
        />
      ),
    },
  ];

  return (
    <div className="container">
      <PatientForm
        isModel={isModel}
        setIsModel={(val) => setIsModel(val)}
        patientId={patientId}
      />
      <Table
        title={() => <Title onAddRegion={() => setIsModel(true)} />}
        columns={columns}
        dataSource={patientData?.patients?.map((item) => {
          return {
            key: item._id,
            name: item.name,
            email: item.email,
            contact: item.contact,
            dob: moment(item.dob).format("LL"),
          };
        })}
        onChange={(pagination) => {
          setPagination({
            page: pagination.current,
            limit: pagination.pageSize,
          });
        }}
        // loading={loading}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultCurrent: 1,
          //   total: data?.getAllTrekRegion?.meta.totalCounts,
        }}
      />
    </div>
  );
};

export default Patients;
