package com.example.core.domain.dto.course;

public class GetCoursesListByAuthorDto {
    private Long id;
    private String name;

    private String desc;

    public GetCoursesListByAuthorDto(Long id, String name, String desc){
        this.id = id;
        this.name = name;
        this.desc = desc;
    }

    public String getName() {
        return name;
    }
    public Long getId(){
        return id;
    }
    public String getDesc() {
        return desc;
    }
}
