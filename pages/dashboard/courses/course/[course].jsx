import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Layout } from "../../../../dashboard/components";
import { BeatLoader } from "react-spinners";
import CourseCard from "../../../../dashboard/components/course-card";

export const Course = () => {
  const notify = () => toast("Saved");
  const { token } = useSelector((state) => state.user);
  const [courseDetail, setCourseDetail] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { course } = router.query;
  console.log(course);

  const getCourseDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setCourseDetail(res.data.data);
      // setCourseDetail(res.data.data.courses);
      setLoading(false);
    } catch (err) {
      setError("error occured");
    }

    // dispatch({ type: "course/setCourse", payload: res.data });
  };

  // const updateSection = async () => {
  //   const res = await axios.patch(
  //     `https://e2b008aa-8ef7-4125-8063-532dfb7d0c2e.mock.pstmn.io/getSection?id=${editorSection.id}`,
  //     {
  //       title: editorSection.title,
  //       description: editorSection.description,
  //       content: editorSection.content,
  //     }
  //   );
  //   notify();
  // };
  useEffect(() => {
    // dispatch({ type: "course/setCourseId", payload: courseId });
    getCourseDetail();
  }, []);

  return (
    <Layout>
      <Flex
        m="6"
        gap="4"
        direction="column"
        align="center"
      >
        <Text
          fontSize="3xl"
          variant="h1"
          casing="capitalize"
        >
          {courseDetail?.course?.title}
        </Text>
        <Text
          fontSize="lg"
          variant="h1"
          casing="capitalize"
        >
          Course description - {courseDetail?.course?.description}
        </Text>
      </Flex>
    </Layout>
  );
};

export default Course;

export { getServerSideProps } from "../../../../shared/lib/chakra";
