SOURCES := $(wildcard src/*)
DESTINATION := dest

define build
    $(eval BUILD_DIRECTORY = $(subst src, dest, $1))
    $(eval TARGET = $(notdir $(BUILD_DIRECTORY)))
    @cp $1/package.json $(BUILD_DIRECTORY);

    @echo "\n"
    @echo "--- Build: $(TARGET) ---"
    @cd $(BUILD_DIRECTORY);
    npm install;
endef


all: $(SOURCES)
	./node_modules/.bin/babel --out-dir dest src

install: $(SOURCES)
	$(foreach DIRECTORY, $(SOURCES), $(call build, $(DIRECTORY)))

.PHONY: clean
clean:
	rm -fr $(DESTINATION)

