package de.litexo;

import com.google.common.io.Files;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

class FileResourceTest {

    @Test
    void testRandomAccessFile() throws IOException {
        String part1 = "Hello";
        String part2 = "World";
        File file = File.createTempFile("temp", ".txt");
        Files.write(new byte[0], file);
        System.out.println(file.getAbsolutePath());
        try (RandomAccessFile rw = new RandomAccessFile(file, "rw")) {
            rw.write(part1.getBytes(StandardCharsets.UTF_8),1,part1.length());
//            rw.seek(part2.length());
//            rw.write(part2.getBytes(StandardCharsets.UTF_8));
        }
    }
}
