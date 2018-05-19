package com.leanovia.dashboard.client;

import com.leanovia.dashboard.domain.User;
import com.leanovia.dashboard.service.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@FeignClient(name = "consultant")
public interface ConsultantFeignClient {
    @RequestMapping(value = "/api/all")
    String getAll();
}
