# boomi_flow_file_downloader
custom boomi flow component to download files, where get the data from integrtion

How to use file downloader component.

1. Create a flow service in boomi integration to pass fileName/fileContent and fileType.
2. Basically it should be a json object to return from integration

{
"fileName" : "this_is_a_text.txt",
"fileContent" : "This is a sample text file download from Boomi flow",
"fileType" : "text/plain"
}

3. Currently supported files types
-----------------------------------   
*** application/pdf
*** text/plain
*** text/csv
*** application/vnd.openxmlformats-officedocument.wordprocessingml.document
*** application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

4. PDF/Docx/XLSX must be pass to flow as base64 encoded value. CSV and Text can come as plain text.

Flow configurations

1. You have to create a new custom component in flow and use complied java script file -
2. create 3 attributes in the custom component
  file Name Hidden Component ID
  file Type Hidden Component ID
  file Content Hidden Component ID

3. We need to create 3 hidden fields in flow page and grab the component ID of thoes hidden fields and set as attribute values for the custom component.


Sample flow - https://au.flow-prod.boomi.com/7029e774-a5b4-4663-9a05-43320fad9d89/play/default-legacy/?flow-id=9e36fe9b-f635-4ef0-989f-71f638c4deba&environment-id=1fd3808c-a18e-4318-b7ce-610f7562adf5

Sample flow token - eRPaYmhCPevz3QhCzyXKtqLQXPYg6tIivr7mcaF3yWVZhegdKKTo1/lHQ6nO4ON/

Sample integration process - https://platform.boomi.com/AtomSphere.html#build;accountId=boomi_apj_demo-2P29E4;components=e7443535-e474-4c11-8e44-4ec930ef202b;componentIdOnFocus=e7443535-e474-4c11-8e44-4ec930ef202b

Important to know

$$$$$$$$$$$ these files will be pulled from integration to flow side and they will become flow stats, if we do some maths

downloading 8MB file = 8MB in flow state database. if we host flow MCR and flow state database locally we need to make sure database scale accordingly. 




