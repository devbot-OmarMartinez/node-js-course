import fs from 'fs'

const constant = 5
let content = `
=============================
        TABLA DEL ${constant}
============================= \n
`

for (let index = 1; index <= 10; index++) {
    content += `${constant} x ${index} = ${constant * index} \n`
}

const outputPath = 'outputs'
const filePath = `${outputPath}/tabla-${constant}.txt`

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true})
}
fs.writeFileSync(filePath, content)