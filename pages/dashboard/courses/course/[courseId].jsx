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
  useColorModeValue,
  Link,
  Code,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CourseLayout from "../../../../dashboard/course/course-layout";

import parse, {
  attributesToProps,
  domToReact,
  Element,
} from "html-react-parser";

import Image from "next/image";

import Head from "next/head";
import { useTransform, useScroll } from "framer-motion";
import { AiOutlineSelect } from "react-icons/ai";

export const Course = () => {
  const notify = () => toast("Saved");
  const { token } = useSelector((state) => state.user);
  const { sectionData, course, courseLoading } = useSelector(
    (state) => state.course
  );
  const [courseDetail, setCourseDetail] = useState();
  const [scrollProgress, setScrollProgress] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { courseId } = router.query;
  const contentColor = useColorModeValue("gray.700", "gray.200");
  const { scrollYProgress } = useScroll();
  const [enrollLoading, setEnrollLoading] = useState(false);
  const linkColor = useColorModeValue("purple.500", "purple.200");
  const codeColor = useColorModeValue("gray.200", "gray.700");

  const getSectionCompletion = async () => {
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/${courseId}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "course/setSectionProgress",
        payload: res.data.data.progress,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setSectionCompletion = async () => {
    if (sectionData.type === "section") {
      if (scrollProgress !== undefined && scrollProgress > 80) {
        try {
          const res = await axios.post(
            `https://roadmap-backend-host.herokuapp.com/api/v1/course/${courseId}/progress`,
            {
              section_id: sectionData.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (sectionData.type === "subsection") {
      if (scrollProgress !== undefined && scrollProgress > 80) {
        try {
          const res = await axios.post(
            `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}/progress`,
            {
              subsection_id: sectionData.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          getSectionCompletion();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    let ignore = false;
    if (yRange.current === 100) {
      if (!ignore) {
        setScrollProgress(Math.trunc(yRange.current));
      }
    } else {
      yRange.onChange((v) => {
        if (!ignore) {
          setScrollProgress(Math.trunc(yRange.current));
        }
      });
    }
    if (!ignore) {
      setSectionCompletion();
    }

    return () => {
      ignore = true;
    };
  }, [sectionData]);

  const options = {
    replace: (domNode) => {
      // Look for an img tag and replace it with Image.
      if (domNode instanceof Element && domNode.name === "img") {
        const { src, alt } = domNode.attribs;

        return (
          <Image
            src={`${src}`}
            width={`200px`}
            height={`200px`}
            alt={alt}
            layout="intrinsic"
            objectFit="cover"
          />
        );
      }
      if (domNode instanceof Element && domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Heading
            as="h1"
            fontSize="1.2rem"
            color={contentColor}
          >
            {domNode.children[0].data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Heading
            as="h1"
            fontSize="1rem"
            color={contentColor}
          >
            {domNode.children[0].data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "a") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Link
            {...props}
            as="a"
            fontSize="1rem"
            color={linkColor}
          >
            {domNode.children[0].data}
          </Link>
        );
      }
      if (domNode instanceof Element && domNode.name === "pre") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Code
            bg={codeColor}
            px="6"
            py="4"
            mb="4"
            rounded="8"
          >
            {domToReact(domNode.children)}
          </Code>
        );
      }
      if (domNode instanceof Element && domNode.name === "iframe") {
        const { src, alt } = domNode.attribs;
        return (
          <iframe
            width="260"
            src={`${src}`}
          >
            {domToReact(domNode.children)}
          </iframe>
        );
      }
      if (domNode instanceof Element && domNode.name === "ol") {
        return (
          <ol style={{ padding: "0 16px" }}>{domToReact(domNode.children)}</ol>
        );
      }
      if (domNode instanceof Element && domNode.name === "ul") {
        return (
          <ul style={{ padding: "0 16px" }}>{domToReact(domNode.children)}</ul>
        );
      }
    },
  };

  const getCourseDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setCourseDetail(res.data.data);
      dispatch({ type: "course/setCourse", payload: res.data.data.course });
      dispatch({ type: "course/setSection", payload: res.data.data.sections });
      // setCourseDetail(res.data.data.courses);
      setLoading(false);
      setEnrollLoading(false);
    } catch (err) {
      setError("error occured");
    }
  };

  const onEnrollment = async (data) => {
    setEnrollLoading(true);
    if (courseDetail?.course?.enrolled === false) {
      try {
        const res = await axios.post(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${courseId}/enrollment`,
          {
            bookmark: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.delete(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${courseId}/enrollment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getCourseDetail();

    dispatch({ type: "course/resetSection" });
  }, []);

  return (
    <CourseLayout data={courseDetail}>
      <Flex
        m={{ sm: "2", md: "4" }}
        gap="4"
        direction="row"
        justifyContent="space-between"
        align="flex-start"
      >
        <Flex
          gap="4"
          direction="column"
          align="left"
        >
          <Skeleton isLoaded={!loading}>
            <Text
              fontSize={{ sm: "xl", md: "2xl" }}
              variant="h1"
              casing="capitalize"
              fontWeight="600"
            >
              Course Title: {courseDetail?.course?.title}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text
              fontSize={{ sm: "lg", md: "xl" }}
              variant="h1"
              casing="capitalize"
              fontWeight="400"
            >
              Course description: {courseDetail?.course?.description}
            </Text>
          </Skeleton>
        </Flex>
        <Button
          isLoading={enrollLoading}
          variant={courseDetail?.course?.enrolled ? "solid" : "ghost"}
          colorScheme="purple"
          onClick={() => onEnrollment(!courseDetail?.course?.enrolled)}
          aria-label="saved"
        >
          {courseDetail?.course?.enrolled ? "Enrolled" : "Enroll now"}
        </Button>
      </Flex>

      <Box
        my={{ sm: "6", md: "12" }}
        mx={{ sm: "0", md: "6" }}
        py="8"
        px={{ sm: "0", md: "8" }}
      >
        {sectionData == "" && (
          <Text
            fontSize="xl"
            textAlign="left"
          >
            Start exploring the course through sections!
          </Text>
        )}
        {sectionData != "" && (
          <>
            <Flex
              gap="6"
              direction="column"
            >
              <Flex
                gap="2"
                direction="column"
              >
                <Skeleton isLoaded={!loading}>
                  <Text
                    as="h1"
                    fontSize={{ sm: "1rem", md: "1.2rem" }}
                    fontWeight="700"
                  >
                    {" "}
                    Title: {sectionData?.title}
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={!loading}>
                  <Text
                    as="h1"
                    fontSize={{ sm: "1rem", md: "1.2rem" }}
                    fontWeight="400"
                  >
                    Description: {sectionData?.description}
                  </Text>
                </Skeleton>
              </Flex>
              <Flex
                gap="6"
                direction="column"
              >
                <Box
                  my="2"
                  bg="#F9F9F6"
                  rounded="8"
                  _dark={{ bg: "gray.900" }}
                  p="8"
                >
                  {parse(`${sectionData?.content}`, options)}
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </CourseLayout>
  );
};

export default Course;

export { getServerSideProps } from "../../../../shared/lib/chakra";
