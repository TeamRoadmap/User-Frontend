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
  const { courses } = useSelector((state) => state.course);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { coursesId } = router.query;

  const getCourseDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course?type=${coursesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "course/setCourses", payload: res.data.data });
      setLoading(false);
    } catch (err) {
      setError("error occured");
    }

    // dispatch({ type: "course/setCourse", payload: res.data });
  };

  useEffect(() => {
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
            {courses?.map((courseData) => {
              return (
                <CourseCard
                  key={courseData.id}
                  title={courseData.title}
                  id={courseData.id}
                  image={courseData.image}
                  description={courseData.description}
                  public_id={courseData.public_id}
                  type={courseData.type}
                  vote={courseData.vote}
                  bookmarked={courseData.bookmarked}
                  enrolled={courseData.enrolled}
                  coursesId={coursesId}
                />
              );
            })}
          </Grid>
        </Skeleton>
        {/* {error && <Err} */}
        {courses?.length === 0 && (
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