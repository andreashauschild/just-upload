package de.litexo;

import io.quarkus.scheduler.Scheduled;
import org.apache.commons.io.FileUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@ApplicationScoped
public class Housekeeping {

    private static final Logger LOG = Logger.getLogger(Housekeeping.class);


    @ConfigProperty(name = "upload.directory")
    String uploadDirectory;

    @ConfigProperty(name = "delete.file.age", defaultValue = "60")
    int deleteFileAge;


    @Scheduled(every = "60s")
    void scanAndDeleteFiles() {

        if (!FileUtils.isDirectory(new File(uploadDirectory))) {
            return;
        }

        Collection<File> files = FileUtils.listFiles(new File(this.uploadDirectory), null, true);
        List<File> toDelete = new ArrayList<>();


        for (File f : files) {
            try {
                if (FileUtils.lastModified(f) > deleteFileAge * 1000) {
                    toDelete.add(f);
                }
            } catch (Exception e) {
                LOG.error("Failed to read last modified for file {0}", f.getAbsolutePath(), e);
            }
        }

        LOG.infov("Check for files to deleted. Found {0}", toDelete.size());

        for (File f : files) {
            LOG.infov("Delete file: {0}", f.getName());
            FileUtils.deleteQuietly(f);
        }
    }
}
