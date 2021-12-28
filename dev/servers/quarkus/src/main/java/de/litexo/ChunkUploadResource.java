package de.litexo;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.spi.HttpRequest;

import javax.annotation.PostConstruct;
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


@Path("/api/chunk-upload")
public class ChunkUploadResource {

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
    /**
     * Endpoint for chunked file upload
     *
     * @param fileId   unique id of file - used to realize uploads of files with identical names
     * @param fileName name of the file
     * @param offset   offset in bytes of the current chunk
     * @param size     total size of the file that is sent
     * @param chunk    chunk of bytes of the transmitted file
     * @param request  http request object (inject by container)
     * @return response
     * @throws IOException
     */
    @POST
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    public Response add(@QueryParam("fileId") String fileId, @QueryParam("fileName") String fileName,
                        @QueryParam("offset") int offset, @QueryParam("fileSize") int size, byte[] chunk,
                        @Context HttpRequest request) throws IOException {
        System.out.println(String.format("id: %s name: %s from:%s to:%s size:%s Auth:Header %s"
                , fileId, fileName, offset, offset + chunk.length, size, request.getHttpHeaders().getHeaderString(HttpHeaders.AUTHORIZATION)));

        if (appendWrite(fileId, fileName, size, offset, chunk)) {
            return Response.status(201).build();
        }
        return Response.ok().build();
    }

    private boolean appendWrite(String fileId, String fileName, int size, int offset, byte[] chunk) throws IOException {
        var upload = filePool.resolve(fileId + "@" + fileName);
        if (!Files.exists(upload) || offset == 0) {
            Files.write(upload, new byte[0]);
        }

        Files.write(upload, chunk, StandardOpenOption.APPEND);

        // Simulate latency - REMOVE IN PRODUCTION CODE
        try {
            Thread.sleep(100L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        long uploaded = Files.size(upload);
        System.out.println("Size on server: " + uploaded + " Expected: " + size + "Appended: " + chunk.length);

        if (uploaded == size) {
            return true;
        }
        return false;
    }


}
