// --------------------------------------------------Basic--------------------------------------------------

import express from 'express';
import mysql from 'mysql';
import cors from 'cors';




const app =express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'crud',
})

app.listen(8081,()=>{
    console.log("listening");
})


// ---------------------------------------------------Read all db---------------------------------------------------

app.get('/', (req, res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})

// ---------------------------------------------------Create-----------------------------------------------

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err.message });
        }
        console.log("Record inserted successfully");
        return res.json({ success: true, result: result });
    });
});


// -------------------------------------------------------Read by id--------------------------------------------

app.get('/read/:id', (req, res)=>{
    const sql = "SELECT * FROM student WHERE Id=?";
    const id = req.params.id;

    db.query(sql,id,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})

// -------------------------------------------------------Update by id--------------------------------------------

app.put('/update/:id', (req,res)=>{
    const sql = 'UPDATE student SET `name`=? , `Email`=? WHERE Id=?';
    const id = req.params.id;
    db.query(sql,[req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })

})

// -----------------------------------------------------------Delete--------------------------------------------


app.delete('/delete/:id', (req, res)=>{
    const sql = "DELETE FROM student WHERE Id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, message: "Record deleted successfully" });
    });
});


// ------------------------------------------------------- Read by id(search)--------------------------------------------

app.get('/view/:email', (req, res)=>{
    const sql = "SELECT * FROM student WHERE Email=?";
    const email = req.params.email;

    db.query(sql,email,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})


//--------------------------------------------------------------send email

import nodemailer from 'nodemailer';


// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's92084072@ousl.lk',
        pass: '200021403688'
    }
});

// Route to handle sending email
app.post('/send-email', (req, res) => {
    const { name, nic } = req.body;

    // Email content
    const mailOptions = {
        from: 'SayCheese Booking System',
        to: 'maleeshapathirana1@gmail.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nNIC: ${nic}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});
