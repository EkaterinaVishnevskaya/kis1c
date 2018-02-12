package com.example.authorization;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import static com.mongodb.client.model.Filters.eq;


@RestController
@RequestMapping
public class AuthorizationController {

    private PasswordEncoder passwordEncoder ;

    AuthorizationController(){
        passwordEncoder = new BCryptPasswordEncoder();
    }

    private ApplicationContext ctx;
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> usersCollection;
    private MongoCollection<Document> tokensCollection;
    private MongoOperations mongoOperation;

    private void Initialize(){
        mongoClient = new MongoClient( "localhost" , 27017 );
        database = mongoClient.getDatabase("local");
        usersCollection = database.getCollection("users");
        ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
        mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
        tokensCollection = database.getCollection("tokens");
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/login")
    public Response login(@RequestBody LoginRequest request) throws ServletException{
        String jwtToken = "";
        ObjectId userId = new ObjectId();
        String loginTime;
        TokenObj obj;
        Date date;
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Initialize();
        System.out.println(request.getEmail()+" "+request.getPassword());
        Iterable<Document> myDoc = usersCollection.find(eq("username", request.getEmail()));
        for(Document doc : myDoc){
            if(passwordEncoder.matches(request.getPassword(), doc.getString("password"))){
                System.out.println("jihugyfds");
                jwtToken = Jwts.builder().setSubject(request.getEmail()).claim("roles", "user").setIssuedAt(new Date())
                        .signWith(SignatureAlgorithm.HS256, "secretkey").compact();
                userId = doc.getObjectId("_id");
                date = new Date();
                loginTime = dateFormat.format(date);
                obj = new TokenObj(userId, jwtToken, loginTime);
                mongoOperation.save(obj, "tokens");
                System.out.println(jwtToken);
                return new Response(true, jwtToken);
            }
        }
        return new Response(false, jwtToken);
    }


    @CrossOrigin(origins = "*")
    @PostMapping(value = "/register")
    public Response register(@RequestBody User user){
        Initialize();
        System.out.println(user.getEmail()+" "+user.getPassword());
        String pwd = passwordEncoder.encode(user.getPassword());
        user.setPassword(pwd);
        mongoOperation.save(user, "users");
        return new Response(true, "");
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/logout")
    public Response logout(@RequestBody String token) {
        Initialize();
        Document tokenDocument = tokensCollection.findOneAndDelete(eq("token", token));
        System.out.println("token" + token);
        if(tokenDocument.isEmpty()) {
            return new Response(false, "");
        } else {
            return new Response(true, "");
        }
    }
}
