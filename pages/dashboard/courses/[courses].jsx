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
import CourseCard from "../../../dashboard/components/course-card";
import { Layout } from "../../../dashboard/components";
import { BeatLoader } from "react-spinners";

export const Courses = () => {
  const notify = () => toast("Saved");
  const { token } = useSelector((state) => state.user);
  const [courseDetail, setCourseDetail] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses } = router.query;

  const getCourseDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course?type=${courses}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourseDetail(res.data.data.courses);
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

  let genreList = {
    "72d0ba81-36ad-443f-839e-530a431ed605": "Frontend",
    "47239a1f-5ef4-40cb-8ba3-6a93bb6245eb": "Backend",
    "ade1092d-d850-4101-b969-ec2cc83472af": "DevOps",
    "258e32c7-ac07-4904-a704-2368ea8553b2": "Git",
  };

  return (
    <Layout>
      <Stack
        direction="column"
        justify="space-between"
        m="4"
        gap="12"
        align="left"
      >
        <Stack direction="column">
          <Heading>{genreList[courses]}</Heading>
        </Stack>
        <Skeleton isLoaded={!loading}>
          {loading && <BeatLoader color="#6B46C1" />}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            {courseDetail?.map((courseData) => {
              return (
                <CourseCard
                  key={courseData.id}
                  title={courseData.title}
                  id={courseData.id}
                  image={courseData.image}
                  description={courseData.description}
                  public_id={courseData.public_id}
                  genre_id={courses}
                />
              );
            })}
          </Grid>
        </Skeleton>
        {/* {error && <Err} */}
        {courseDetail?.length === 0 && (
          <Heading fontSize="1rem">
            We will have more courses on our platform soon!
          </Heading>
        )}

        {/* { title, id, description, public_id }
        <CourseCard title={} id={} image={} description={} /> */}
        {/* <Stack direction="column">
          <Heading>{course?.title}</Heading>
          <Text>{course?.description}</Text>
        </Stack> */}
      </Stack>
    </Layout>
  );
};

export default Courses;

export { getServerSideProps } from "../../../shared/lib/chakra";
