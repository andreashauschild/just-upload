package de.litexo;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.spi.HttpRequest;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;


@Path("/api/basic-upload")
public class BasicUploadResource {

    @ConfigProperty(name = "upload.directory")
    String uploadDirectory;

    java.nio.file.Path filePool;


    @PostConstruct
    void init() throws IOException {
        if (!Files.exists(Paths.get(uploadDirectory))) {
            this.filePool = Files.createDirectories(Paths.get(uploadDirectory));
        } else {
            this.filePool = Paths.get(uploadDirectory);
        }
    }


    @POST
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/single-binary")
    public Response add(@QueryParam("fileId") String fileId, @QueryParam("fileName") String fileName, byte[] file,
                        @Context HttpRequest request) throws IOException {
        System.out.println(String.format("id: %s name: %s size:%s Auth:Header %s"
                , fileId, fileName, file.length, request.getHttpHeaders().getHeaderString(HttpHeaders.AUTHORIZATION)));
        writeFile(fileId, fileName, file);
        return Response.ok().build();
    }


    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/multipart-form")
    public void uploadAsMultipartForm(@Context HttpServletRequest request) {
        System.out.println("REQUEST");
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        try {
            if (isMultipart) {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                List<FileItem> items = upload.parseRequest(request);
                for (FileItem item : items) {
                    writeFile(String.valueOf(System.currentTimeMillis()), item.getName(), item.get());
                }
            } else {
                throw new RuntimeException("Could not read multipart content. Is this a multipart request?");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


    private void writeFile(String fileId, String fileName, byte[] file) throws IOException {
        var upload = filePool.resolve(fileId + "@" + fileName);
        Files.write(upload, file, StandardOpenOption.CREATE_NEW);
        long uploaded = Files.size(upload);
        System.out.println("Size on server: " + uploaded + " Expected: " + file.length);
    }


}
